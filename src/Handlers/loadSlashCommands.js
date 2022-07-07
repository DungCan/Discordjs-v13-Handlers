const chalk = require("chalk");
const { readdirSync } = require("fs");
const { join } = require("path");
const { table, getBorderCharacters } = require("table");
function loadSlashCommands(client) {
  let cmdcount = 0;
  let slashCommands = []
  let data = [["Command name", "Status"]];
  const config = {
    border: getBorderCharacters("norc"),
  };
  readdirSync("./src/SlashCommands/").forEach(dir => {
    const commands = readdirSync(`./src/SlashCommands/${dir}/`).filter(file =>
      file.endsWith(".js")
    );
    for (const file of commands) {
      const fileName = `../SlashCommands/${dir}/${file}`;
      delete require.cache[require.resolve(fileName)];
      const pull = require(fileName);
      if (pull.name) {
        cmdcount++;
        client.interactions.set(pull.name, pull);
        slashCommands.push(pull)
        data.push([
          chalk.hex("#E5C3FF")(file),
          chalk.hex("#4DFDBB")("loaded ✅"),
        ]);
      } else {
        data.push([
          chalk.hex("#E5C3FF")(file),
          chalk.hex("#FD4D50")(`error ❌`),
        ]);
        continue;
      }
    }
  });
  client.on('ready', async () => {
     client.application.commands.set(slashCommands)
  })
  console.log(table(data, config));
  console.log(chalk.hex("#4DFDBB")(`${cmdcount} SlashCommands loaded`));
}
module.exports = {
  loadSlashCommands,
};
