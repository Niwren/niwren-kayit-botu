const Discord = require('discord.js')
const util = require('util');
const db = require('quick.db')
const tokenuyari = `Sen hiç yarrak yedinmi?`


module.exports = {
    name: 'eval',
    aliases: ['eval'],
    run: async(client, message, args) => {


        let izinli = ["676128212681490459"] // kendi idni koy
        if (!izinli.includes(message.member.id)) return message.channel.send('')

        if (args[0] == '@everyone') return;

        if (!args[0]) {
            const embed = new Discord.MessageEmbed()
                .setDescription(`Kod yaz`)
                .setColor("RANDOM")
                .setTimestamp()
            message.channel.send({ embed })
            return
        }

        const code = args.join(' ');
        if (code.match(/(client.token)/g)) {
            const newEmbed = new Discord.MessageEmbed()
                .addField('Hata çıktı;', `\`\`\`xl\n${tokenuyari}\`\`\``)
                .setColor('#FF0000');
            message.channel.send(newEmbed);
            return
        }

        function clean(text) {
            if (typeof text !== 'string')
                text = require('util').inspect(text, { depth: 0 })
            text = text
                .replace(/`/g, '`' + String.fromCharCode(8203))
                .replace(/@/g, '@' + String.fromCharCode(8203))
            return text;
        };

        const evalEmbed = new Discord.MessageEmbed().setColor("RANDOM")
        try {
            var evaled = clean(await eval(code));
            if (evaled.startsWith('NTQ3M')) evaled = tokenuyari;
            if (evaled.constructor.name === 'Promise') evalEmbed.setDescription(`\`\`\`\n${evaled}\n\`\`\``)
            else evalEmbed.setDescription(`\`\`\`js\n${evaled}\n\`\`\``)
            const newEmbed = new Discord.MessageEmbed()
                .setDescription(`\`\`\`js\n${evaled}\`\`\``)
                .setColor("RANDOM")
            message.channel.send(newEmbed);
        } catch (err) {
            evalEmbed.addField('Hata çıktı;', `\`\`\`js\n${err}\n\`\`\``);
            evalEmbed.setColor('#FF0000');
            message.channel.send(evalEmbed);
        }
    }
}