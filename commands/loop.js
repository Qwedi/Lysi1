const { MessageEmbed } = require("discord.js")
const { COLOR } = require("../config.json");

module.exports = {
  name: "loop",
  description: "Loop Your Queue and have fun",
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

    if (!serverQueue) {
      embed.setAuthor("Там нет ничего играющего, что я могла бы зациклить")
      return message.channel.send(embed);
    }
    
    //OOOOF
    serverQueue.loop = !serverQueue.loop
    
    
    embed.setDescription(`Повтор **${serverQueue.loop ? "Включено" : "Выключено"}**`)
    embed.setThumbnail(client.user.displayAvatarURL())
    message.channel.send(embed)
    
    
    
    
  }
}