var builder = require('botbuilder');
var restify = require('restify');


//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector,{
    autoBatchDelay: 1500
});
server.post('/api/messages', connector.listen());


//=========================================================
// Bots Dialogs
//=========================================================

var intents = new builder.IntentDialog();
bot.dialog('/', intents);

intents.matches(/^voglio cambiare nome/i, [
    function (session) {
        session.beginDialog('/profile');
    },
    function (session, results) {
        session.send('Ok... hai cambiato nome in %s', session.userData.name);
        session.sendBatch();
        session.send("Bel nome %s", session.userData.name);
    }
]);

intents.matches(/^fatti vedere/i, [
    function(session){
        session.beginDialog('/cards');
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
    function (session, results, next) {
        session.send('Ciao %s!', session.userData.name);
        session.sendBatch();
        next();
    },
    function(session, next){
        session.beginDialog('/immagine');
      
    },
    function(session){
        session.send('Digita "fatti vedere" per una mia scheda');
        
    }
  
]);


//===================================

// Other dialog

//==================================

bot.dialog('/profile', [
    function (session) {
        builder.Prompts.text(session, 'Ciao! Come ti chiami?');
    },
    function (session, results) {
        session.userData.name = results.response;
        session.endDialog();
    }
]);

bot.dialog('/immagine',[
    function(session){
        session.send("puoi vedere una mia foto... ");
        var msg = new builder.Message(session)
            .attachments([{
                contentType: "image/jpeg",
                contentUrl: "http://www.theoldrobots.com/images62/Bender-18.JPG"
            }]);
        session.send(msg);    
        session.endDialog();
    }
]);


bot.dialog('/cards', [
    function (session) {
        var messaggio = new builder.Message(session)
            .textFormat(builder.TextFormat.xml)
            .attachments([
                new builder.HeroCard(session)
                    .title("Bender Card")
                    .subtitle("Carta del profilo")
                    .text("Cliccando su di me vedi dove vivo")
                    .images([
                        builder.CardImage.create(session, "http://www.theoldrobots.com/images62/Bender-18.JPG")
                    ])
                    .tap(builder.CardAction.openUrl(session, "http://www.sardegnacultura.it/j/v/253?v=2&c=2488&t=1&s=19232"))
            ]);
        session.endDialog(messaggio);
    }
]);