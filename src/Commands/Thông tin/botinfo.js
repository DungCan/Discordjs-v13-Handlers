const { moment, utc } = require('moment')
const { MessageEmbed, version: djsversion } = require("discord.js");
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
module.exports = {
  name: "botinfo",
  description: "Số liệu thống kê chi tiết của bot",
  cooldown: 5,
  aliases: ["bot"],
  usage: "<PREFIX>botinfo",
  category: "Thông tin",
  botPermission: ['SEND_MESSAGES', 'EMBED_LINKS'],
  run: async (client, message, args) => {
    const guildManager = client.guilds.cache;
    let totalSeconds = (client.uptime / 1000);
    let days = Math.floor(totalSeconds / 86400);
    totalSeconds %= 86400;
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds % 60);
    const emo = '<a:cham:873236584923807774>'
    const serverStats = stripIndent`
     ${emo} **OS**        : ${await os.oos()}
     ${emo} **Cores**     : ${cpu.count()}
     ${emo} **CPU**       : ${cpu.model()}
     ${emo} **CPU Usage** : ${await cpu.usage()} %
     ${emo} **RAM**       : ${client.func.formatBytes(process.memoryUsage().heapTotal)}
     ${emo} **RAM Usage** : ${client.func.formatBytes(process.memoryUsage().heapUsed)}
    `;
    let uptime = `${days} ngày, ${hours} giờ, ${minutes} phút và ${seconds} giây`;
    let status;
    switch (client.user.presence.status) {
      case "online":
        status = "<a:Online_1:764893134886273046>";
        break;
      case "dnd":
        status = "<a:DND_1:764893086814961665>";
        break;
      case "idle":
        status = "<a:Idle_1:764893219393372190>";
        break;
      case "offline":
        status = "<a:Offline_1:764893180537077780>";
        break;
    }

    let embed = new MessageEmbed()
      .setColor(message.guild.me.displayHexColor || client.emoji.color)
      .setThumbnail(client.user.displayAvatarURL())
      .setAuthor({name:`Các thông tin về ${client.user.username}`, iconURL: client.user.displayAvatarURL()})
      .setDescription(`Hii, chào các bạn mình là **${client.user.username}** <:shy:795616465591336961>`)
      .setFooter({text:`❤️ From Dunz with love`})
      .addField("Được tạo vào: ", `<t:${Math.floor(client.user.createdTimestamp / 1000)}:R>`, true)
      .addField("Hiện có:", `${client.commands.size} lệnh`, true)
      .addField("Hoạt động:", `${status} - ${uptime}`)
      //.addField("Trạng thái:",  client.presence.activities[0].name, true)
      .addField("Tổng số người dùng:", `${client.func.laysodep(guildManager.reduce((a, b) => a + b.memberCount, 0))}`, true)
      .addField('Phiên bản Discord.js:', `v${djsversion}`, true)
      .addField('Server:', `${serverStats}`)
      .setImage(message.guild.bannerURL({dynamic:true, size:512}))
    message.channel.send({ embeds: [embed] })

  }
};