// Récupération du client mongodb
var mongoClient = require('mongodb').MongoClient;
var eventType = require('./models');

// Paramètres de connexion
var url = 'mongodb://localhost/mydb';

// Connexion au serveur avec la méthode connect
mongoClient.connect(url, function (err, db) {
    if (err) {
        return console.error('Connection failed', err);
    }
    console.log('Connection successful on ', url);

	// Récupération de la collection users
var collection = db.collection('response');

var query = { intents: "Greeting" };
  collection.find({}).toArray(function(err, result) {
    if (err) throw err;
    //console.log(result);
	//var finalResult = result[result.length-1].intents;
	var a = "hey";
var finalResult = "lkjh";
    //console.log(finalResult);
	exports.finalResult = finalResult;

	db.close();

  });

 console.log(eventType.finalResult);

});
