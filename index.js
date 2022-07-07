/** @format */
require("dotenv")
const config = require("./src/assets/json/config")
const Client = require("./src/Structures/Client.js");
const Discord = require('discord.js')
const client = new Client();
const { loadCommands } = require("./src/Handlers/loadCommands");
const { loadFunctions } = require("./src/Handlers/loadFunctions");
const { loadEvents } = require("./src/Handlers/loadEvents");
const { loadSlashCommands } = require('./src/Handlers/loadSlashCommands')
const chalk = require('chalk');
const winston = require('winston');
const database = require('./src/db/create')

/** LOAD DATABASE */
database.connect(config.MONGODB)
/** LOAD HANDLERS */
loadCommands(client)
loadFunctions(client)
loadEvents(client)
loadSlashCommands(client)
/** LOAD ANTI CRASH */
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'antiCrashLog.log' }),
  ],
  format: winston.format.printf(log => `[${log.level.toLowerCase()}] - ${log.message}`),
});
process.on("uncaughtException", (err, origin) => {
  logger.error(chalk.blueBright('[antiCrash.js]') + chalk.red('Uncaught exception/catch detected.'));
  logger.error(err.stack, origin.stack);
});
process.on('uncaughtExceptionMonitor', (err, origin) => {
  logger.error(chalk.blueBright('[antiCrash.js]') + chalk.red('Uncaught exception/catch detected. (Monitor)'));
  logger.error(err.stack, origin.stack);
});
process.on('multipleResolves', (type, promise, reason) => {
  logger.error(chalk.blueBright('[antiCrash.js]') + chalk.red('Multiple resolves detected.'));
  logger.error(type, promise.stack, reason.stack);
});

//** CLIENT LOGIN */
client.start(config.TOKEN);

