const { readdirSync } = require('fs');
const { MessageEmbed } = require('discord.js');
const emojis = require("../../assets/json/emojis.json")
const fs = require("fs");
module.exports = {
  name: 'help',
  description: 'Danh sách tất cả các lệnh của bot',
  cooldown: 5,
  category: `Thông tin`,
  aliases: [],
  usage: '<PREFIX>help',
  botPermission: ['SEND_MESSAGES', 'EMBED_LINKS', 'ADD_REACTIONS'],
  run: async (client, message, args, sprefix) => {
    const commands = await client.commands;
    let commandsize = 0;
    let embed = new MessageEmbed()
      .setColor(message.client.emoji.color)
      .setAuthor({name: `Chào mừng đến với ${message.guild.name}!`, iconURL: client.user.displayAvatarURL()})
      .setThumbnail(message.guild.iconURL({ dynamic: true }));
    if (!args[0]) {
      let com = {};
      for (let comm of commands.values()) {
        if (comm.category) {
          let category = comm.category;
          let name = comm.name;

          if (!com[category]) {
            com[category] = [];
          }
          com[category].push(name);
          commandsize++
        }
      }

      for (const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "`" + value.join("`, `") + "`";

        embed.addField(`<:text:781104954257309706> ${category} ‹${value.length} lệnh›:`, desc);
      }

      embed.setDescription(`Danh sách lệnh của  **${message.guild.me.displayName}**\n Prefix của server là: **${sprefix}**\nTổng số lệnh: **${commandsize}**`)
        embed.setFooter({text:`Sử dụng ${sprefix}help (lệnh) để biết thêm thông tin | © Dunz#0052`});

      message.channel.send({
        embeds: [embed]
      })
    } else {
      return getCMD(client, message, args[0]);
    }
  },
};

async function getCMD(client, message, args) {
  let prefix = client.prefix
  const embed = new MessageEmbed();
  const commandName = args.toLowerCase();
  const cmd = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  //if(!cmd) return message.channel.send(`Cannot find command with name: **${input.toLowerCase()}**`)
  let info = `${emojis.x} | Không tìm thấy lệnh với tên: **${commandName}**`;
  let nsfw = `${emojis.x} | Lệnh này chỉ hoạt động trong kênh NSFW`;
  if (!cmd || cmd.nsfw === true && message.channel.nsfw === false) return message.reply({embeds : [embed.setColor("RED").setDescription(info)]});
  // if(!cmd) return message.channel.send(embed.setColor("RED").setDescription(info));
  //if (cmd.category) info = `**<a:starr:765887939480649748> | Category**: \`${cmd.category}\``;
  if (cmd.name) info = `**<a:starr:765887939480649748> | Tên lệnh**: \`${cmd.name}\``;
  if (cmd.aliases) info += `\n**<a:starr:765887939480649748> | Viết tắt**: ${cmd.aliases.join(", ") || "Không có"}`;
  if (cmd.category) info += `\n**<a:starr:765887939480649748> | Phân loại**: \`${cmd.category.replace(/<PREFIX>/g, prefix) || "<:downvote:777882844844130344>"}\``;
  if (cmd.description) info += `\n**<a:starr:765887939480649748> | Miêu tả**: ${cmd.description.replace(/<PREFIX>/g, prefix) || "<:downvote:777882844844130344>"}`;
  if (cmd.usage) {
    info += `\n**<a:starr:765887939480649748> | Cách dùng**: __${cmd.usage.replace(/<PREFIX>/g, prefix) || "<:downvote:777882844844130344>"}__`;
  }
  embed.setFooter(`Cú pháp: () = bắt buộc, [] = không bắt buộc`);

  if (cmd.note) info += `\n**<:dotcom:784637625318375435> | Ghi chú**: \`${cmd.note.replace(/<PREFIX>/g, prefix) || "<:downvote:777882844844130344>"}\``;
  if (cmd.example) info += `\n<:dotcom:784637625318375435> | **Ví dụ**: ${cmd.example.replace(/<PREFIX>/g, prefix) || "<:downvote:777882844844130344>"}`;
  embed.setColor(message.client.emoji.color).setDescription(info).setImage('https://cdn.discordapp.com/attachments/682768459435999232/784639570985746433/divider_1.gif').setThumbnail('https://cdn.discordapp.com/attachments/682768459435999232/784638390645162045/Save-Help-Me-Sticker-downsized.gif')
  return message.channel.send({ embeds: [embed] });
}

