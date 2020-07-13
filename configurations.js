require('dotenv').config()

module.exports = {
    port: process.env.PORT || 3000,
    bot_token :  process.env.BOT_TOKEN
}