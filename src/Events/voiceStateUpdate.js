const db = require('quick.db')
module.exports = async (client, oldstate, newstate) => {

    if (oldstate.member.id !== client.user.id) return;
    if (newstate.channelId == null && (await db.get(`tts.${oldstate.guild.id}.speaking`) == true) ){
        await db.set(`tts.${oldstate.guild.id}.speaking`, false)
    }
};