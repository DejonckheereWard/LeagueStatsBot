'use strict'
// Shows statistics of a league user

const fetch = require('node-fetch');

const rankGifs = [
    "https://tenor.com/view/league-of-legends-rankup-iron-gif-21927982",
    "https://tenor.com/view/league-of-legends-rankup-bronze-gif-21927990",
    "https://tenor.com/view/league-of-legends-rankup-silver-gif-21927990",
    "https://tenor.com/view/league-of-legends-rankup-gold-gif-21928002",
    "https://tenor.com/view/league-of-legends-rankup-platinum-gif-21927987",
    "https://tenor.com/view/league-of-legends-rankup-diamond-gif-21928000",
    "https://tenor.com/view/league-of-legends-rankup-master-gif-21927984",
    "https://tenor.com/view/league-of-legends-rankup-grandmaster-gif-21928004",
    "https://tenor.com/view/league-of-legends-rankup-challenger-gif-21927997"
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

module.exports = async function(msg, args)
{

    if(args.length > 0)
    {       
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

        msg.channel.send(
            "Displaying statistics of user: " + summonerData.name + "\n" +
            "Level: " + summonerData.summonerLevel + "\n" +
            "Rank: " + leagueRank + "\n" +
            dictRankGifs[leagueRank.toLowerCase()]
        );         
        
    }     
    else{
        console.log("Shows statistics of a summoner (EUW only atm)");
    }
}