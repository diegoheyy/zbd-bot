const logger = require("../../../src/config/logger");
const axios = require("axios");
const { MessageAttachment } = require("discord.js");
const LOL_TOKEN = process.env.LOL_TOKEN;
const LOL_URL = process.env.LOL_URL;

const urlbyname = `${LOL_URL}/lol/summoner/v4/summoners/by-name/`;
const urlbyid = `${LOL_URL}/lol/champion-mastery/v4/champion-masteries/by-summoner/`;
const urlimgchamp = `${LOL_URL}/lol/league/v4/entries/by-summoner/`;

module.exports = {
  name: "maestria",
  cooldown: 5,
  description: "Maestria!",
  args: true,
  execute(message, args, argsfull) {
    test(message, args, argsfull);
  },
};

const test = async (message, args, argsfull) => {
  console.log(argsfull)
  const nameResponse = await axios
    .get(`${urlbyname}${encodeURI(argsfull)}`, {
      headers: {
        "X-Riot-Token": `${LOL_TOKEN}`,
      },
    })
    .catch((err) => {
      return { data: err.message };
    });
  const { id, icon, level } = nameResponse.data;

  const imglink =
    "https://ddragon.leagueoflegends.com/cdn/11.18.1/img/champion/splash/Lux.jpg";

  const idResponse = await axios
    .get(`${urlbyid}${id}`, {
      headers: {
        "X-Riot-Token": `${LOL_TOKEN}`,
      },
    })
    .catch((err) => {
      logger.info(`eita erro ao buscar as informações do lol`);
      return { erro: err.message };
    });

  if (idResponse.data) {
    const champ = await getChampion(idResponse.data[0].championId);
    message.channel.send(
      `${argsfull} :\n**${champ.id}**, ${
        champ.title
      } - **${idResponse.data[0].championPoints.toLocaleString(
        "pt-BR"
      )}** pontos.`
    );
  } else {
    message.reply(`Não encontrei nada :c`);
  }
  // const img = new MessageAttachment("https://ddragon.leagueoflegends.com/cdn/11.18.1/img/champion/Lux.png")
  // message.channel.send("hmm", img);
  // let msg = ``;

  // message.reply(`essas são as informações de **${argsfull[0]}**\n${msg}`);
};

const getChampion = (idChamp) => {
  return axios
    .get(
      `http://ddragon.leagueoflegends.com/cdn/11.18.1/data/pt_BR/champion.json`,
      {
        headers: {
          "X-Riot-Token": `${LOL_TOKEN}`,
        },
      }
    )
    .then((list) => {
      let championList = list.data.data;
      for (var i in championList) {
        if (championList[i].key == idChamp) {
          logger.info(championList[i].id);
          return championList[i];
        }
      }
    })
    .catch((err) => {
      return { data: err.message };
    });
};
