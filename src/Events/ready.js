
require('dotenv');
const wait = require('util').promisify(setTimeout);
const { laysodep } = require('../util/util')
const db = require('quick.db')
const chalk = require('chalk');
const util = require('util');
const { glob } = require('glob');
const globPromise = util.promisify(glob);
module.exports = async (client) => {

 await wait(1000);
  setInterval(async function() {
const res = client.guilds.cache.size
const member = client.users.cache.size
    let botStatus = [
      `${laysodep(res)} servers ♡ ?help`,
      `${laysodep(res)} servers ♡ ${laysodep(member)} members`
    ]
    let status = botStatus[Math.floor(Math.random() * botStatus.length)];
    client.user.setActivity(client.config.PREFIX+'help', { type: "LISTENING" });
  }, 60000)

  client.user.setStatus("online"); // sets the bots status
  const res = client.guilds.cache.size
  const channel = client.channels.cache.size
  const member = client.users.cache.size
  console.log(chalk.hex('#E5C3FF')(`${client.user.tag} has started, with ${member} users, in ${channel} channels of ${laysodep(res)} guilds.`))
  const start_bot = `${client.user.tag} has started, with ${member} users, in ${channel} channels of ${res} guilds.`
};
