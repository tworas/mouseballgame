
var ES = require('./email-settings');
var EM = {};
module.exports = EM;

EM.server = require("emailjs/email").server.connect({

	host 	    : ES.host,
	user 	    : ES.user,
	password    : ES.password,
	ssl		    : true

});

EM.dispatchResetPasswordLink = function(account, callback)
{
	EM.server.send({
		from         : ES.sender,
		to           : account.email,
		subject      : 'Resetowanie hasla',
		text         : 'Cos poszlo nie tak... :(',
		attachment   : EM.composeEmail(account)
	}, callback );
}

EM.composeEmail = function(o)
{
	var link = 'http://mouseballgame.tworas.c9.io/reset-password?e='+o.email+'&p='+o.pass;
	var html = "<html><body>";
		html += "Hi "+o.name+",<br><br>";
		html += "Twoja nazwa uzytkownika to :: <b>"+o.user+"</b><br><br>";
		html += "<a href='"+link+"'>Proszę kliknąć tutaj, aby zresetować hasło</a><br><br>";
		html += "Pozdrawiam,<br>";
		html += "Administrator<br><br>";
		html += "</body></html>";
	return  [{data:html, alternative:true}];
}