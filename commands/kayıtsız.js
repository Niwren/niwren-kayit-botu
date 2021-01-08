const db = require('quick.db');
const Discord = require('discord.js');

module.exports = {
    name: 'kayıtsız',
    aliases: ['kayıtsız', 'unreg', 'unregister'],

    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('🎄Developed by Niwren🎄');

        if (!client.config.mods.some(id => message.member.roles.cache.has(id))) {
            return message.channel.send(embed.setDescription("Bu Komut İçin Yetkin Bulunmuyor."))
        }

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

        if (!member) return message.channel.send(embed.setDescription("Lütfen Bir Kullanıcı Etiketle"))
        if (member.roles.highest.position >= message.member.roles.highest.position) {
            return message.channel.send(embed.setDescription("Belirttiğin kullanıcı seninle aynı yetkide veya senden üstün!"))
        }
        if (member.premiumSinceTimestamp > 0 || member.roles.cache.has(client.config.vipRoles)) return message.channel.send(embed.setDescription("Booster ve vipleri kayıtsıza atamazsın!"))
        member.roles.set(client.config.unregisteres)
        message.channel.send(embed.setDescription("Kullanıcı Kayıtsız Kısmına Atıldı."))
        db.delete(`kayıt_${member.id}`)
    }
}