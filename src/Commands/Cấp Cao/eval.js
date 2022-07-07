const { inspect } = require('util');
const {post} = require('../../util/post')
const { MessageEmbed } = require('discord.js')
    module.exports = {
        name: "eval",
        aliases: [],
        usage: "",
        description: "evallllllll",
        dunz: true,
  run: async (client, message, args,sprefix) => {
            if (!args[0]) return message.reply('Type code');
            try {
                const start = process.hrtime();
                let output = eval(args.join(' '))
                const difference = process.hrtime(start);
                if (typeof output !== "string") output = inspect(output, { depth: 2 });
                const content = `\`\`\`js\n${output.length > 1950 ? await post(output) : output}\n\`\`\``
                return message.channel.send({content: content});
            }
            catch(err) {
                return message.channel.send({ content: `Error:\n\`${err.stack}\``});
            }
    },
};