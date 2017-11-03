var mongoose = require('mongoose');

var mongoDB = 'mongodb://admin:admin@cluster-shard-00-00-lld8v.mongodb.net:27017,cluster-shard-00-01-lld8v.mongodb.net:27017,cluster-shard-00-02-lld8v.mongodb.net:27017/test?ssl=true&replicaSet=cluster-shard-0&authSource=admin';

mongoose.connect(mongoDB, {
    useMongoClient: true
});

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));


