const chalk = require("chalk");
const { readdirSync } = require("fs");
const { join } = require("path");
const { table, getBorderCharacters } = require("table");
function loadFunctions(client) {
  let funcount = 0;
  const config = {
    border: getBorderCharacters("norc"),
  };
  let data = [["Function name", "Status"]];
  const functions = readdirSync(`./src/Functions/`).filter(file =>
    file.endsWith(".js")
  );
  for (const file of functions) {
    try {
      const fileName = `../Functions/${file}`;
      delete require.cache[require.resolve(fileName)];
      const pull = require(fileName)(client);
      funcount++;
      data.push([
        chalk.hex("#E5C3FF")(file),
        chalk.hex("#4DFDBB")("loaded ✅"),
      ]);
    } catch (err) {
      console.error(err);
      data.push([chalk.hex("#E5C3FF")(file), chalk.hex("#FD4D50")(`error ❌`)]);
      continue;
    }
  }
  console.log(table(data, config));
  console.log(chalk.hex("#4DFDBB")(`${funcount} functions loaded`));
}
module.exports = {
  loadFunctions,
};
