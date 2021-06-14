// Handles the help command and shows information about all available commands
module.exports = function(msg, args)
{
    const prefix = process.env.DEFPREFIX

  // Return an embedded message to show all the commands
  msg.channel.send(
      "Here's a list of currently available commands:\n" +
      prefix + "help" + "\n" + 
      prefix + "gif" + "\n" + 
      prefix + "ping" + "\n" + 
      prefix + "rank" + "\n"
      )
}

