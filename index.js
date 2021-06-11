console.log("Starting up script!");

require("dotenv").config();

const Discord = require('discord.js');
const client = new Discord.Client();
client.login(process.env.BOTTOKEN);

client.on('ready', readyDiscord);
client.on('message', messageReceived);

function readyDiscord()
{
    
    console.log("League Stats Bot connected");
}

function messageReceived(msg)
{
    console.log("Received a message: ");
    console.log(msg.content);
    if(msg.content == 'counting')
    {
        msg.channel.send('counting');
    }
}