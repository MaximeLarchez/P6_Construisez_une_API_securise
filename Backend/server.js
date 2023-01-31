//Importe le package Http de node 
const http = require('http');
// Importation du app.js
const app = require('./app');


// permet de dire a l'application sur quelle PORT elle va fonctionné
app.set('port', process.env.PORT || 3000);

// variable qui crée un serveur 
const server = http.createServer(app);

// Ecoute du server sur le PORT par defaut ou 3000
server.listen( process.env.PORT || 3000);

