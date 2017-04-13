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
    autoBatchDelay: 500
});
server.post('/api/messages', connector.listen());

//=========================================================
// Bots Dialogs
//=========================================================

bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, 'Ciao! Come ti chiami?');
      // builder.Prompts.confirm(session, "Are you sure you wish to cancel your order?"); // accetta "yes" "no" e memorizza un boolean
     // builder.Prompts.number(session, "How many would you like to order?"); //accetta solo numeri
    // builder.Prompts.choice(session, "Which color?", "red|green|blue"); //lista
    //builder.Prompts.choice(session, "Which color?", ["red","green","blue"]); //altra lista
   // builder.Prompts.attachment(session, "Upload a picture for me to transform."); //caricare un file (spesso un immagine)
},
    function (session, results) {
       // session.send('Ciao %s!', results.response);
        
         session.send(`Ciao ${results.response}`);  
    }
]);
