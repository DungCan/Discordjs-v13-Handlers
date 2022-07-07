const chalk = require("chalk");
const { readdirSync } = require("fs");
const { join } = require("path");
const { table, getBorderCharacters } = require("table");
function loadCommands(client) {
  let cmdcount = 0;
  let data = [["Command name", "Status"]];
  const config = {
    border: getBorderCharacters("norc"),
  };
  readdirSync("./src/Commands/").forEach(dir => {
    const commands = readdirSync(`./src/Commands/${dir}/`).filter(file =>
      file.endsWith(".js")
    );
    for (const file of commands) {
      const fileName = `../Commands/${dir}/${file}`;
      delete require.cache[require.resolve(fileName)];
      const pull = require(fileName);
      if (pull.name) {
        cmdcount++;
        client.commands.set(pull.name, pull);
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
      if (pull.aliases && Array.isArray(pull.aliases))
        pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));
    }
  });
  console.log(table(data, config));
  console.log(chalk.hex("#4DFDBB")(`${cmdcount} commands loaded`));
}
module.exports = {
  loadCommands,
};
