/*
Questo bot è una cagata funziona solo in console a livello didattico
*/

var builder = require('botbuilder');

var connector = new builder.ConsoleConnector().listen();
var bot = new builder.UniversalBot(connector);

//bot.dialog('/', function (session) {
 //   session.send('Hello World');
//});

bot.dialog('/', [
    function (session) {
        builder.Prompts.text(session, 'Ciao! Come ti chiami?');
    },
    function (session, results) {
       // session.send('Ciao %s!', results.response);
        
         session.send(`Ciao ${results.response}`);  
    }
]);