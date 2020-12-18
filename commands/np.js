const { MessageEmbed } = require("discord.js")

const { COLOR } = require("../config.json");

module.exports = {
  name: "np",
  description: "Get the name of current playing song",
  execute (client, message, args) {
    let embed = new MessageEmbed()
.setColor(COLOR)
      
    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("Вы не присоеденились к голосвому каналу :/")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("Бот ничего не играет")
      return message.channel.send(embed);
    }
    
    embed.setDescription(`**Сейчас играет** - ${serverQueue.songs[0].title}`)
    .setThumbnail(serverQueue.songs[0].thumbnail)
    message.channel.send(embed)

    
    
    
  }
}