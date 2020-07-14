var config = require('./../configurations')

module.exports = ( client ) => {

    client.on('message', async (message) => {

        // It's good practice to ignore other bots. This also makes your bot ignore itself
        // and not get into a spam loop (we call that "botception").
        if(message.author.bot) return;

        // Also good practice to ignore any message that does not start with our prefix, 
        // which is set in the configuration file.
        if(!message.content.startsWith(config.bot_prefix)) return;

        // Here we separate our "command" name, and our "arguments" for the command. 
        // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
        // command = say
        // args = ["Is", "this", "the", "real", "life?"]
        const args = message.content.slice(config.prefix).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        //handle commands fo the future
        if(command === "!ping"){
            message.channel.send("Pong!");
        }
        
        return; 
    })
    

}