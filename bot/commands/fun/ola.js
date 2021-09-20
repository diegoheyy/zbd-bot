const { Client, MessageEmbed } = require('discord.js');
module.exports = {
  name: 'ola',
  description: 'Boas vindas!',
  // args: true,
  execute (message, args) {
    message.reply(`você por aqui? como vai ?`)
  }
}
