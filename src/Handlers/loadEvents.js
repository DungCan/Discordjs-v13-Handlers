const chalk = require("chalk");
const { readdirSync } = require("fs");
const { join } = require("path");
const { table, getBorderCharacters } = require("table");
function loadEvents(client) {
  let evtcount = 0;
  const config = {
    border: getBorderCharacters("norc"),
  };
  let data = [["Event name", "Status"]];
  const files = readdirSync(join(__dirname, '..', 'Events'));
    for (const file of files) {
      if (file.endsWith('.js')) {
        const eventName = file.substring(0, file.indexOf('.js'));
        try {
          const eventModule = require(join(__dirname, '..', 'Events', file));
          client.on(eventName, eventModule.bind(null, client));
          //client.once(eventName, eventModule.bind(null, client));
          evtcount++;
          data.push([chalk.hex('#E5C3FF')(file), chalk.hex('#4DFDBB')('loaded ✅')])
        }
        catch (err) {
          console.error(err);
          data.push([chalk.hex('#E5C3FF')(file), chalk.hex('#FD4D50')(`error ❌`)])
          continue;
        }
      }
    }
  console.log(table(data, config));
  console.log(chalk.hex('#4DFDBB')(`${evtcount} events loaded`));
}
module.exports = {
  loadEvents,
};
