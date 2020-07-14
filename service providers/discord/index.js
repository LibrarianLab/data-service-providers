const { Client } = require("discord.js")
let cfgs = require('./configurations')

let client = new Client()

require('./listeners/index.js')(client)

let Initialize = () => {

    client.login(cfgs.bot_token).catch((error) => {
        console.error(error);
        process.exit(1)
    })

}
module.exports = {
    configurations : cfgs,
    Initialize
}