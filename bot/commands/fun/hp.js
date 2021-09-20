const axios = require('axios')
const url = 'https://ajith-messages.p.rapidapi.com/getMsgs%22?category=birthday'

module.exports = {
  name: 'hp',
  cooldown: 5,
  description: 'hp!',
  args: true,
  execute(message, args) {
    test(message, args)
  },
}

const test = async (message, args) => {
  const res = await axios.get(url, {
    headers: {
      'x-rapidapi-key': 'f4b7f655b0mshb45b5b76db013c1p17a68ejsne0df4f619184',
      'x-rapidapi-host': 'ajith-messages.p.rapidapi.com',
    }
  }).catch((err) => {
    return {data: err.message}
  })
  message.channel.send(`Hello ${args[0]}, ${res.data.Message}`)
}
