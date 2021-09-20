const PREFIX = process.env.PREFIX

module.exports = {
  name: 'help',
  description: 'Lista de todos os comandos ou informações sobre um comando específico.',
  aliases: ['commands'],
  usage: '[command name]',
  cooldown: 5,
  execute (message, args) {
    const data = []
    const { commands } = message.client

    if (!args.length) {
      data.push('Segue uma lista de todos os meus comandos:')
      data.push(commands.map(command => command.name).join(', '))
      data.push(`Você pode enviar \`${PREFIX}help [command name]\` para obter ajuda sobre o comando!`)

      return message.author.send(data, { split: true })
        .then(() => {
          if (message.channel.type === 'dm') return
          message.reply('Eu te enviei uma DM com todos os meus comandos!')
        })
        .catch(error => {
          console.error(`Não consegui enviar uma DM para ${message.author.tag}.\n`, error)
          message.reply('Parece que eu não consigo enviar uma DM para você, suas DMs estão desabilitadas?')
        })
    }
    const name = args[0].toLowerCase()
    const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name))

    if (!command) {
      return message.reply('comando inválido')
    }

    data.push(`**Name:** ${command.name}`)

    if (command.aliases) data.push(`**Aliases:** ${command.aliases.join(', ')}`)
    if (command.description) data.push(`**Description:** ${command.description}`)
    if (command.usage) data.push(`**Usage:** ${PREFIX}${command.name} ${command.usage}`)

    data.push(`**Cooldown:** ${command.cooldown || 3} second(s)`)

    message.channel.send(data, { split: true })
  }

}
