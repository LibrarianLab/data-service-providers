const utils = require('./utils');
const commandsHandler = require('./commands');

module.exports = (client) => {
    client.on('message', async (message) => {

        if (!utils.isAValidRequest(message)) return;

        const command = utils.getCommandWithArgs(message);
        const findTheHandlerToExecute = commandsHandler(message)[command];
        
        return findTheHandlerToExecute ? findTheHandlerToExecute() : utils.getCommandNotFoundMessage(message);
    });
}