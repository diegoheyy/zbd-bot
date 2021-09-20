const logger = require('../../../src/config/logger')
const axios = require('axios')
const LOL_TOKEN = process.env.LOL_TOKEN
const LOL_URL = process.env.LOL_URL

const urlbyname = `${LOL_URL}/lol/summoner/v4/summoners/by-name/`
const urlbyid = `${LOL_URL}/lol/league/v4/entries/by-summoner/`
const urlbyidtft = `${LOL_URL}/tft/league/v1/entries/by-summoner/`


module.exports = {
  name: 'elo',
  cooldown: 5,
  description: 'Elo!',
  args: true,
  execute(message, args, argsfull) {
    test(message, args, argsfull)
  },
}

const test = async (message, args, argsfull) => {
  const nameResponse = await axios.get(`${urlbyname}${encodeURI(argsfull)}`, {
    headers: {
      "X-Riot-Token": `${LOL_TOKEN}`
    }
  }).catch((err) => {
    logger.info(`${urlbyname}${encodeURI(argsfull)}`)
    return { data: err.message }
  })
  const { id, icon, level } = nameResponse.data

  logger.info(id)

  //Ranked lol
  const idResponse = await axios.get(`${urlbyid}${id}`, {
    headers: {
      "X-Riot-Token": `${LOL_TOKEN}`
    }
  }).catch((err) => {

    logger.info(`eita erro ao buscar as informações do lol`)
    return { erro: err.message }

  })
  logger.info(JSON.stringify(idResponse.data))
  let msg = ``
  if (idResponse.erro) {
    msg = `Eita, algo não ta certo |  ${idResponse.erro}`
  } else if (idResponse.data.length === 0) {
    msg = `**${argsfull}** não se preocupa com elo em Summoner's Rift.\n`
  } else {

    for (let index = 0; index < idResponse.data.length; index++) {
      const dado = idResponse.data[index];
      let fila = dado.queueType == "RANKED_FLEX_SR" ? "Flex" : "Solo/Duo"
      let { tier, rank, wins, losses } = dado
      msg += `${fila}:\n **${tier} ${rank}** |Winrate: **${((wins / (wins + losses)) * 100).toFixed(1)}%** | Vitorias: ${wins} Derrotas: ${losses}\n\n`

    }
  }
  //Ranked tft
  const idResponsetft = await axios.get(`${urlbyidtft}${id}`, {
    headers: {
      "X-Riot-Token": `${LOL_TOKEN}`
    }
  }).catch((err) => {

    logger.info(`eita - deu ruim na busca pelo tft`)
    return { erro: err.message }

  })
  logger.info(JSON.stringify(idResponsetft.data))

  if (idResponsetft.erro) {
    msg = `Eita, algo não ta certo |  ${idResponsetft.erro}`
  } else if (idResponsetft.data.length === 0) {
    msg += `\n **${argsfull}** não joga TFT Rankeado, que decepção...`
  } else {

    for (let index = 0; index < idResponsetft.data.length; index++) {
      const dado = idResponsetft.data[index];
      // let fila = dado.queueType == "RANKED_TFT" ? "TFT Ranked" : "TFT Frenetico"
      if (dado.queueType == "RANKED_TFT") {
        let fila = "TFT Ranked"
        let { tier, rank, wins, losses } = dado
        msg += `${fila}:\n **${tier} ${rank}** |Winrate: **${((wins / (wins + losses)) * 100).toFixed(1)}%** | 1º Lugar: ${wins} Total de partidas: ${losses + wins}\n\n`
      }
      if (dado.queueType == "RANKED_TFT_TURBO") {
        let fila = "TFT Frenetico"
        let { ratedTier, ratedRating, wins, losses } = dado
        msg += `${fila}:\n **${ratedTier} ${ratedRating}** |Winrate: **${((wins / (wins + losses)) * 100).toFixed(1)}%** | 1º Lugar: ${wins} Total de partidas: ${losses + wins}\n\n`
      }
    }

  }
  message.reply(`essas são as informações de **${argsfull}**\n${msg}`)
}

