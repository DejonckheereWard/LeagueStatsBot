
// const gif = require("./commands/gif.js");
// const rank = require("./commands/rank.js");
// const ping = require("./commands/ping.js");

const fs = require('fs');  // FileSystem package
const prefix = process.env.DEFPREFIX;

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'));  // Reading all command files in the ./command folder
let commands = {};  // Dictionary to store all commands

// Loading in all the commands found earlier
for(const file of commandFiles){
    const command = require(`./commands/${file}`);
    commands[file.slice(0,-3)] = command;
}

// Handler for the commands, checking for the prefix & splitting the command & arguments
module.exports = async function (msg) {
    let tokens = msg.content.trim().split(/ +/);
    let command = tokens.shift();
    if(command.substr(0, prefix.length) === prefix)
    {
        command = command.substring(prefix.length);
        try{
            commands[command](msg, tokens);
        }
        catch(error){
            console.log(command);
            msg.channel.send("Unknown command, use " + prefix + "help for a list of commands");
        }
    }
    else if (msg.content.includes(" int ") || msg.content.includes(" inting "))
    {
        msg.reply("Inting bad!");
    }
}