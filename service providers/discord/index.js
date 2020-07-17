const { Client } = require("discord.js")
const cfgs = require('./configurations')

const client = new Client()

const Initialize = () => {

    client.login(cfgs.bot_token).catch((error) => {
        console.error(error);
        process.exit(1)
    });

    client.once('ready', () => {
        console.log(` - BOT initialized successfully  with ${client.users.size} users in ${client.channels.size} channels of ${client.guilds.size} guilds.`);

        client.user.setPresence({
            status: 'online',
            activity: {
                name: `Serving servers!`,
                type: 'PLAYING'
            }
        });
    });

}

require('./listeners/index.js')(client);

module.exports = {
    configurations : cfgs,
    Initialize
}