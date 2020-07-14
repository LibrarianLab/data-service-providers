var Discord = require('discord.js')

module.exports = (client) => {
    
    client.once('ready', () => {

        console.log(` - BOT initialized successfully  with ${client.users.size} users in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

        client.user.setPresence({
            status: 'online',
            activity: {
                name: `Serving servers!`,
                type: 'PLAYING'
            }
        })

    })

    require('./message')(client);

    
}