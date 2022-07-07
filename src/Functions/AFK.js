const db = require('quick.db')




async function afk(client) {
  client.on("messageCreate", async message => {
    if (message.channel.type !== 'GUILD_TEXT') return;
    if (message.author.bot) return;
    let afk = new db.table("AFKs")
    const authorStatus = await afk.get(`${message.author.id}_${message.guild.id}`)
    const mentioned = message.mentions.members.first()

    if (mentioned) {
      const status = await afk.fetch(`${mentioned.id}_${message.guild.id}`);

      if (status) {
        let times = db.fetch(`AFK_${mentioned.id}_${message.guild.id}`)
        var endDate = new Date()
        var time = (endDate.getTime() - times) / 1000;
        message.reply({ content: `${mentioned.user.tag} đã AFK: ${status} [*${secondsToDhms(time)} trước*]` })

      }

    }

    if (authorStatus) {
      db.delete(`AFK_${message.author.id}_${message.guild.id}`)
      afk.delete(`${message.author.id}_${message.guild.id}`)
      if (message.guild.me.permissions.has("MANAGE_NICKNAMES")) {
        message.member.setNickname(`${message.member.displayName.replace('[AFK]', '')}`).catch((e) => {
          if (e.message == 'Mising Permisson') return
        })
      }
      message.reply({ content: `Hí! Chào mừng ${message.author} đã trở lại` })
    }
  })
}
function secondsToDhms(seconds) {
  seconds = Number(seconds);
  var d = Math.floor(seconds / (3600 * 24));
  var h = Math.floor(seconds % (3600 * 24) / 3600);
  var m = Math.floor(seconds % 3600 / 60);
  var s = Math.floor(seconds % 60);

  var dDisplay = d > 0 ? d + (d == 1 ? " ngày, " : " ngày, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " giờ, " : " giờ, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " phút, " : " phút, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? "s" : "s") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}


module.exports = afk