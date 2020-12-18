const { MessageEmbed } = require("discord.js")

const { COLOR } = require("../config.json");


module.exports = {
  name: "resume", 
  description: "Resume the Cureent Playing Song",
  execute (client, message, args) {
    let embed = new MessageEmbed()
.setColor(COLOR);

      const { channel } = message.member.voice;
      
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("Вы не присоеденились к голосвому каналу :/")
      return message.channel.send(embed);
    }

    const serverQueue = message.client.queue.get(message.guild.id);
 if(serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume()
  embed.setAuthor("✅ / Возобновила прерванную песню")
   embed.setThumbnail(client.user.displayAvatarURL())
  return message.channel.send(embed)
 }
    embed.setDescription("Нет ничего приостановленного, что я могла бы продолжить")
    message.channel.send(embed)
    
  }
}