const { MessageEmbed } = require("discord.js")
module.exports = async (text, channel, message) => {
    let embed = new MessageEmbed()
    .setColor("RED")
    .setDescription(text)
    .setFooter({text: `© Dunz#0052`})
    await channel.send({embeds:[embed],allowedMentions: { repliedUser: true }})
}