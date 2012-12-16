

var exp = require('express');
var app = exp.createServer();

app.root = __dirname;
global.host = 'localhost';

require('./app/config')(app, exp);
require('./app/server/router')(app);

app.listen(process.env.PORT, function(){
	console.log("Serwer nasluchuje na porcie %d w %s mode", app.address().port, app.settings.env);
});