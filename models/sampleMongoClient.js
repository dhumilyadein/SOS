console.log('Jai shree Ganesh');

var mongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost/sosdb';

var db;

mongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
    
    console.log("Connected to MONGO DB");
    
    db = client.db('sosdb');

    var cursor = db.collection('users').find();
    
    cursor.each(function(err, doc) {
        console.log(doc);
    });

    client.close();
});