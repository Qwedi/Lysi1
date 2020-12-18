const { MessageEmbed } = require("discord.js")

const { COLOR } = require("../config.json");


module.exports = {
  name: "skip",
  description: "Skip the song or shift yourself to next song",
  async execute(client, message, args) {
   
    
    
    
let embed = new MessageEmbed()
.setColor(COLOR);


    const { channel } = message.member.voice;

       
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("Вы не присоеденились к голосвому каналу :/")
      return message.channel.send(embed);
    }
    const serverQueue = message.client.queue.get(message.guild.id);
const vote = message.client.vote.get(message.guild.id)
    if (!serverQueue) {
      embed.setAuthor("Нет ничего такого, что я могла бы пропустить")
      return message.channel.send(embed);
    }
    
    const vcvote = Math.floor(message.guild.me.voice.channel.members.size / 2)
    const okie = Math.floor(message.guild.me.voice.channel.members.size / 2 - 1)
    console.log(message.guild.me.voice.channel.members.size)
     if(!message.member.hasPermission("ADMINISTRATOR")) {
       if(vote.vote > okie) {
         serverQueue.connection.dispatcher.end();
    embed.setDescription("Голосовать-пропустить / пропустить песню")
    embed.setThumbnail(client.user.displayAvatarURL())
    return message.channel.send(embed);
       }
       
       if(vote.voters.includes(message.author.id)) {
         return message.channel.send("Вы уже проголосовали за эту песню")
       }
       
       if(vcvote === 2) {
          serverQueue.connection.dispatcher.end();
    embed.setDescription("✔ / Пропуск Песни")
    embed.setThumbnail(client.user.displayAvatarURL())
    return message.channel.send(embed);
       }
       
       
       
vote.vote++
       vote.voters.push(message.author.id)
       return message.channel.send(`Вы проголосовали за то, чтобы пропустить песню, кстати, нам сейчас нужно ${Math.floor(vcvote - vote.vote)} голосов`)
    
     
     
     
     }

    serverQueue.connection.dispatcher.end();
    embed.setDescription("✔ | Skipping The Song")
    embed.setThumbnail(client.user.displayAvatarURL())
    message.channel.send(embed);
  }
};
