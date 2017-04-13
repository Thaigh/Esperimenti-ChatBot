var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);
var intents = new builder.IntentDialog();
bot.dialog('/', intents);

intents.matches(/^voglio cambiare nome/i, [
    function (session) {
        session.beginDialog('/profile');
    },  
    function (session, results) {
        session.send('Ok... hai cambiato nome in %s', session.userData.name);
    }
]);

intents.onDefault([
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            next();
        }
    },
    function (session, results) {
        session.send('Ciao %s!', session.userData.name);
    }
]);

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Ciao! Come ti chiami?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);