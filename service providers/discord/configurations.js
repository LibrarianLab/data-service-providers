require('dotenv').config()

module.exports = {
    bot_token :  process.env.BOT_TOKEN || null,
    bot_prefix : process.env.BOT_PREFIX || '!'
}