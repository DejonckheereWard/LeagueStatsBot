'use strict';

console.log("Starting up script!");

require("dotenv").config();

const Discord = require('discord.js');
const fetch = require('node-fetch');
const client = new Discord.Client();
client.login(process.env.BOTTOKEN);

const commandHandler = require("./commands");

client.on('ready', readyDiscord);

function readyDiscord() {

    console.log("League Stats Bot connected");
}


client.on('message', commandHandler);
