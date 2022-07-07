const Timeout = new Set();
const { MessageEmbed, Collection } = require("discord.js");
const ms = require('ms')
const cooldowns = new Collection();
const erros = require('../util/errors')
const blacklist = require('../db/models/blacklist')
const Discord = require('discord.js')
module.exports = async (client, message) => {
  if (message.channel.type != 'GUILD_TEXT') return
  if (!message.guild) return;
  if (message.author.bot) return;
  let default_prefix = client.prefix
  let sprefix = client.prefix
  if (message.content.match(new RegExp(`^<@!?${client.user.id}>( |)$`))) {
    return message.channel.send({
      embeds: [new Discord.MessageEmbed()
        .setColor(client.emoji.color)
        .setDescription(`**${client.emoji.tick} Prefix là: **\`${default_prefix}\``)]
    })
  }
  const escapeRegex = str =>
    str.replace(/[.<>`•√π÷×¶∆£¢€¥*@_+?^${}()|[\]\\]/g, "\\$&");
  const prefixRegex = new RegExp(
    `^(<@!?${client.user.id}>|${escapeRegex(default_prefix)})\\s*`
  );
  if (!prefixRegex.test(message.content.toLowerCase())) return;
  const [, prefix] = message.content.toLowerCase().match(prefixRegex);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd);
  if (!command) command = client.commands.get(client.aliases.get(cmd));
  if (command) {
    const blacklisted = await blacklist.findOne({ user: message.author.id })
    const guild_blacklist = await blacklist.findOne({ guild: message.guild.id })
    if (blacklisted) {
      if (blacklisted.user == message.author.id) return;
    }
    if (guild_blacklist) {
      if (guild_blacklist.guild == message.guild.id) return;
    }
    let disableCmd = await client.quickdb.get(`${message.channel.id}_disabled`) || []
    if (disableCmd.includes(command.name)) return message.react('🖕🏻')
    let check = false
    let ownerss = [ '516482175617728514']
    let owners = ["516482175617728514","756739148454428683","757542435953049661","536840506731266058","359810028892585985","714799298876932136","973980052712734730"]
    if (!owners.includes(message.author.id)) check = true
    if (!ownerss.includes(message.author.id) && command.dunz == true) return
    if (command.owner === true && check == true) return
    if (command.disable === true && check == true) return message.reply({ content: 'Lệnh đang được tạm ngưng vì có một chút trục trặc xin vui lòng thử lại sau!' })
    message.channel.messages.fetch({ limit: 5 }).catch((e) => console.log('Message fetch = null'))
    if (!cooldowns.has(command.name)) cooldowns.set(command.name, new Collection());
    if (!checkMsgPerm(message)) return message.author.send(`**${client.emoji.warning} Mình không có đủ quyền ở kênh ${message.channel} . Hãy cho mình những quyền được liệt kê bên dưới để có thể chạy được một cách tốt ** nhất!\n\`\`\`fix\nSEND_MESSAGES, VIEW_CHANNEL, READ_MESSAGE_HISTORY, EMBED_LINKS, ADD_REACTIONS\n\`\`\``).catch(err => console.log(`${message.author.id} không mở DMs`));
    console.log(`${message.author.tag} used command ${command.name} in server ${message.guild.name}`)
    client.channels.cache.get('947148223338938408').send(`${message.author.tag} | ID: \`${message.author.id}\` sử dụng lệnh **${command.name}** tại kênh ${message.channel.name} | ID: \`${message.channel.id}\` GUILD: ${message.guild.name}\n<t:${Math.floor(Date.now() / 1000)}>`)
    /*client.channels.cache.get('869147483832471572').send(`${message.author.tag} | ID: ${message.author.id} used command \`${command.name}\` in ${message.guild.name} [${message.guild.id}] `)*/
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 5) * 1000;
    if (timestamps.has(message.author.id) && check == true) {
      const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
      if (now < expirationTime) {
        const timeLeft = (expirationTime - now) / 1000;
        const trigger = new Discord.MessageEmbed()
          .setDescription(`**${client.emoji.clock} Bạn chỉ có thể sử dụng lệnh này sau **\`${timeLeft.toFixed(1)}\`**s**`)
          .setColor(client.emoji.color)
        return message.reply({ embeds: [trigger] }).then(msg => {
          if (msg) setTimeout(() => msg.delete(), timeLeft * 1000)
        })
      }
    }
    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    /**-----------------------[PERMISSIONS]--------------------- */
    let botperms = []

    if (command.botPermission) {
      command.botPermission.forEach((p) => {
        if (!message.guild.me.permissions.has(p)) botperms.push("`" + p + "`");
      });
      if (botperms.length > 0) return erros(
        `${client.emoji.warning} Mình cần quyền ${botperms.join(
          ", "
        )} để có thể chạy lệnh này`, message.channel
      )
    }

    function checkMsgPerm(message) {
      const botPerms = message.channel.permissionsFor(client.user);
      return botPerms.has(['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'ADD_REACTIONS']);
    }
    command.run(client, message, args, sprefix);
  }
};
function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor(seconds % (3600 * 24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + (d == 1 ? " ngày, " : " ngày, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " giờ, " : " giờ, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " phút, " : " phút, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " giây" : " giây") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

