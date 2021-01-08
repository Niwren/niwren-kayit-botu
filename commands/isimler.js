const db = require('quick.db');
const { MessageEmbed } = require('discord.js')
module.exports = {
    name: 'isimler',
    aliases: ['isimler'],

    run: async(client, message, args) => {

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send("Öncellikle Bir Kullanıcı Belirtmelisin.")
        let isimler = db.get(`isimler_${member.user.id}`);
        if (!isimler) return message.channel.send("Bu Kullanıcının Daha Öncedenki İsmi Bulunmuyor.")
        const embed = new MessageEmbed()
            .setColor('BLUE')
            .setTitle("Bu kullanıcı daha önceden")
            .setDescription(isimler.map((data, i) => `**${i + 1}.** ${data}`).join("\n") + `\nisimlerinde kayıt olmuş.`)
            .setFooter('Niwren was Here')
            .setTimestamp()
        message.channel.send(embed)
    }
}