const { MessageEmbed,MessageButton,MessageActionRow } = require("discord.js")
module.exports = async (text,channel) => {
   const row = new MessageActionRow()
   .addComponents(
     new MessageButton()
        .setStyle("LINK")
        .setURL('https://discord.gg/uFguJQV6Dw')
        .setEmoji('869140895046451200')
        .setLabel('Server hỗ trợ')
   )
    let embed = new MessageEmbed()
    .setColor("RED")
    .setDescription('> Để sử dụng không giới hạn lệnh vui lòng nâng cấp lên Premium perk\n [Bấm vào đây để truy cập vào server support](https://discord.gg/uFguJQV6Dw)')
    .setFooter(`Cú pháp: () = bắt buộc, [] = không bắt buộc`)
    await channel.send({
    content:text,
    embeds:[embed],
    allowedMentions: { repliedUser: true },
    components: [row]
    })
}