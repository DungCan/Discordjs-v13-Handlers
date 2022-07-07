const { MessageEmbed } = require("discord.js")
const Client = require('../Structures/Client')
const client = new Client()
    module.exports = async (text, channel) => {
        let embed = new MessageEmbed()
        .setColor("GREEN")
        .setDescription(text)
       .setFooter({text: `© Dunz#0052`})
        await channel.send({embeds:[embed],allowedMentions: { repliedUser: true }})
    }