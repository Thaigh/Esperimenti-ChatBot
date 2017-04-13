//pacchetti necessari
var builder = require('botbuilder');


var connector = new builder.ConsoleConnector().listen();
//creazione del bot e passaggio al connector
var bot = new builder.UniversalBot(connector,{
    autoBatchDelay : 1500
});

//dialog della root, se non conosce il nome si passa al dialog /profile, altrimenti alla funazione
//successiva dove si saluta l'utente.
bot.dialog('/', [
    function (session, args, next) {
        if (!session.userData.name) {
            session.beginDialog('/profile');
        } else {
            next();
        }
    },
    function (session, results) {
        session.send('Hello %s!', session.userData.name);
        session.sendBatch();
        session.send("Come va ?");
    }
]);

//In questo dialog si memorizza il nome dell'utente e si chiude il dialogo
bot.dialog('/profile', [
    function (session) {
       builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);