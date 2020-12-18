const { MessageEmbed } = require("discord.js");

const { COLOR } = require("../config.json");
module.exports = {
  name: "volume",
  description: "Manage the volume of the song",
  execute(client, message, args) {
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You are not allowed to change the volume of the music")
    }
    

    
    let embed = new MessageEmbed().setColor(COLOR);

    
    const { channel } = message.member.voice;
    if (!channel) {
      //IF AUTHOR IS NOT IN VOICE CHANNEL
      embed.setAuthor("Вы не присоеденились к голосвому каналу :/")
      return message.channel.send(embed);
    }
    
     const serverQueue = message.client.queue.get(message.guild.id);

    if (!serverQueue) {
      embed.setAuthor("Бот не играет сейчас музыку...")
      return message.channel.send(embed);
    }
    
    if(!args[0]) {
      embed.setAuthor(`Громкость: ${serverQueue.volume}`)
      return message.channel.send(embed)
    }
    
    if(isNaN(args[0])) {
      embed.setAuthor("Пожалуйста, Используйте Только Числовые Значения")
      return message.channel.send(embed)
    }
    
    if(args[0] > 150) {
      embed.setAuthor("Максимальная громкость 150 :)")
      return message.channel.send(embed)
    }
    
    serverQueue.volume = args[0]
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 100)
    embed.setDescription(`Поставлена громкость: ${args[0]}`)
    embed.setThumbnail(client.user.displayAvatarURL())
    message.channel.send(embed)
    
  }
};
