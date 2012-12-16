
var bcrypt = require('bcrypt')
var Db = require('mongodb').Db;
var Server = require('mongodb').Server;

var dbPort = 27017; //27017
var dbHost = global.host;
var dbName = 'login-testing';

var moment = require('moment');

var AM = {}; 
	AM.db = new Db(dbName, new Server(dbHost, dbPort, {auto_reconnect: true}),{w:1});
	AM.db.open(function(e, d){
		if (e) {
			console.log(e);
		}	else{
			console.log('polaczenie z baza :: ' + dbName);
		}
	});
	AM.accounts = AM.db.collection('accounts');

module.exports = AM;

// zalogowniae auto i manual //

AM.autoLogin = function(user, pass, callback)
{
	AM.accounts.findOne({user:user}, function(e, o) {
		if (o){
			o.pass == pass ? callback(o) : callback(null);
		}	else{
			callback(null);
		}
	});
}

AM.manualLogin = function(user, pass, callback)
{
	AM.accounts.findOne({user:user}, function(e, o) {
		if (o == null){
			callback('user-not-found');
		}	else{
			bcrypt.compare(pass, o.pass, function(err, res) {
				if (res){
					callback(null, o);
				}	else{
					callback('invalid-password');
				}
			});
		}
	});
}

// zapis rekordu, aktualizacja i usuwanie  //

AM.signup = function(newData, callback)
{
	AM.accounts.findOne({user:newData.user}, function(e, o) {
		if (o){
			callback('username-taken');
		}	else{
			AM.accounts.findOne({email:newData.email}, function(e, o) {
				if (o){
					callback('email-taken');
				}	else{
					AM.saltAndHash(newData.pass, function(hash){
						newData.pass = hash;
						newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
						AM.accounts.insert(newData, callback(null));
					});
				}
			});
		}
	});
}

AM.update = function(newData, callback)
{
	AM.accounts.findOne({user:newData.user}, function(e, o){
		o.name 		= newData.name;
		o.email 	= newData.email;
		o.country 	= newData.country;
		if (newData.pass == ''){
			AM.accounts.save(o); callback(o);
		}	else{
			AM.saltAndHash(newData.pass, function(hash){
				o.pass = hash;
				AM.accounts.save(o); callback(o);
			});
		}
	});
}

AM.setPassword = function(email, newPass, callback)
{
	AM.accounts.findOne({email:email}, function(e, o){
		AM.saltAndHash(newPass, function(hash){
			o.pass = hash;
			AM.accounts.save(o); callback(o);
		});
	});
}

AM.validateLink = function(email, passHash, callback)
{
	AM.accounts.find({ $and: [{email:email, pass:passHash}] }, function(e, o){
		callback(o ? 'ok' : null);
	});
}

AM.saltAndHash = function(pass, callback)
{
	bcrypt.genSalt(10, function(err, salt) {
		bcrypt.hash(pass, salt, function(err, hash) {
			callback(hash);
		});
	});
}

AM.delete = function(id, callback)
{
	AM.accounts.remove({_id: this.getObjectId(id)}, callback);
}

// pomocnicze metody //

AM.getEmail = function(email, callback)
{
	AM.accounts.findOne({email:email}, function(e, o){ callback(o); });
}

AM.getObjectId = function(id)
{
	return AM.accounts.db.bson_serializer.ObjectID.createFromHexString(id)
}

AM.getAllRecords = function(callback)
{
	AM.accounts.find().toArray(
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};

AM.delAllRecords = function(id, callback)
{
	AM.accounts.remove();
}

// funkcje testowe //

AM.findById = function(id, callback)
{
	AM.accounts.findOne({_id: this.getObjectId(id)},
		function(e, res) {
		if (e) callback(e)
		else callback(null, res)
	});
};


AM.findByMultipleFields = function(a, callback)
{
	AM.accounts.find( { $or : a } ).toArray(
		function(e, results) {
		if (e) callback(e)
		else callback(null, results)
	});
}
