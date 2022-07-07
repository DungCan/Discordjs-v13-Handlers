const { MessageEmbed } = require('discord.js');

module.exports = {
        name: "ping",
        description: "Displays user and bot latency",
        aliases: "",
        category: "Fun",

     run: async (client, message, args) =>{

        message.channel.send("**Pinging...**").then(m => {
            let ping = m.createdTimestamp - message.createdTimestamp
            const embed = new MessageEmbed()
                .setColor("GREEN")
                .setAuthor({name: "Pong!", iconURL: client.user.displayAvatarURL()})
                .setDescription(`Your ping **${ping}** ms\n\nBot ping **${Math.round(client.ws.ping)}** ms`)
            message.channel.send({embeds : [embed]})
            m.delete()
        })
    }
};
