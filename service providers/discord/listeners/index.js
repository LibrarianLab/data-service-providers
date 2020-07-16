const requestsHelper = require('../helpers/requests.helper');
const commandsHandler = require('./commands');

module.exports = (client) => {
    client.on('message', async (message) => {

        if (!requestsHelper.isAValidRequest(message)) return;

        const command = requestsHelper.getCommandWithArgs(message);
        const findTheHandlerToExecute = commandsHandler(message)[command];
        
        return findTheHandlerToExecute ? findTheHandlerToExecute() : requestsHelper.getCommandNotFoundMessage(message);
    });
}