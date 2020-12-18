const { MessageEmbed } = require("discord.js")

const { COLOR } = require("../config.json");

module.exports = {
  name: "pause",
  description: "Приостановите воспроизведение песни целителя",
  execute (client, message, args) {
  const { channel } = message.member.voice;
   let embed = new MessageEmbed()
.setColor(COLOR);

    
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("Вы не присоеденились к голосвому каналу :/")
      return message.channel.send(embed);
    }
    
    
    const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("Нет ничего играющего, что я могла бы приостановить")
      return message.channel.send(embed);
    }
    
    if(serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause(true)
      
      embed.setDescription("✅ / Приостановила Текущую Воспроизводимую Песню")
      embed.setThumbnail(client.user.displayAvatarURL())
      return message.channel.send(embed)
  }  
  }
}