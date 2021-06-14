const fetch = require('node-fetch');
const Discord = require('discord.js');

const rankGifs = [
    "https://media.tenor.com/images/c26f069da2f3bae3070f860061b74be8/tenor.gif",
    "https://media.tenor.com/images/1f2e227251b725f5e08b7f54738da411/tenor.gif",
    "https://media.tenor.com/images/1f2e227251b725f5e08b7f54738da411/tenor.gif",
    "https://media.tenor.com/images/7e8a1cdfc84dbc78d56e4919fd412aed/tenor.gif",
    "https://media.tenor.com/images/8c70978994f91ee76c6244986ed6351b/tenor.gif",
    "https://media.tenor.com/images/430660bd15577b1b803ae7c03d3750df/tenor.gif",
    "https://media.tenor.com/images/d8ca650dbf5a6cce1f55f7c1c8bb3f5f/tenor.gif",
    "https://media.tenor.com/images/a84d60c1a99b983bcbe22131a9dac066/tenor.gif",
    "https://media.tenor.com/images/02fd0bca58f1b7b2339123f575ba50e6/tenor.gif"
];
const dictRankGifs = {
    "unranked": "",
    "iron": rankGifs[0],
    "bronze": rankGifs[1],
    "silver": rankGifs[2],
    "gold": rankGifs[3],
    "platinum": rankGifs[4],
    "diamond": rankGifs[5],
    "master": rankGifs[6],
    "grandmaster": rankGifs[7],
    "challenger": rankGifs[8]
};

function capitalize(str)
{
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);

}

module.exports = async function (msg, args) {
    if (args.length > 0) {
        let summonerDataUrl = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${args[0]}?api_key=${process.env.RIOTAPIKEY}`;
        let summonerDataResponse = await fetch(summonerDataUrl);
        let summonerData = await summonerDataResponse.json();

        let leagueDataUrl = `https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerData.id}?api_key=${process.env.RIOTAPIKEY}`;
        let leagueDataResponse = await fetch(leagueDataUrl);
        let leagueData = await leagueDataResponse.json();

        console.log(leagueData);

        let leagueRank = "unranked";
        for (let i = 0; i < leagueData.length; i++) {
            if (leagueData[i].queueType === "RANKED_SOLO_5x5") {
                leagueRank = leagueData[i].tier.toLowerCase();
            }
        }

        if (leagueRank.toLowerCase() === "unranked") {
            msg.channel.send(
           "This summoner does not have a solo/duo rank."
            );
        }
        else {
            const embed = new Discord.MessageEmbed()
                .setTitle(capitalize(leagueRank) + "!\n")
                .setImage(dictRankGifs[leagueRank.toLowerCase()]);

            msg.channel.send(embed);
        }
    }
    else {
        msg.channel.send("Enter a summoner's name to show the player's rank");
    }
};
