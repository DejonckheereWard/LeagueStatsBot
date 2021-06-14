
const fetch = require('node-fetch');

module.exports = async function(msg, args)
{
    msg.channel.send("A random league of legends gif!");
    let keywords = "leagueoflegends";
    let url = "https://g.tenor.com/v1/search?q=" + keywords + "&key=" + process.env.TENORAPIKEY + "&ContentFilter=high";
    let response = await fetch(url);
    let json = await response.json();
    let index = Math.floor(Math.random() * json.results.length);
    msg.channel.send(json.results[index].url);
}