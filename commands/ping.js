module.exports = async function(msg, args)
{
    msg.channel.send(
        `🏓 Pong!\n` +
        `Latency is ${Date.now() - msg.createdTimestamp}ms.\n` +
        `API Latency is ${Math.round(msg.client.ws.ping)}ms`);
}

