const commandsHandler = ( message ) => {

    const channel = message.channel;

    return {
        '!ping': (args = null) => {
            channel.send('Pong!')
        },
        '!pumm': (args = null) => {
            channel.send('TAAAAAAAAA!')
        }
    };
}

module.exports = commandsHandler;