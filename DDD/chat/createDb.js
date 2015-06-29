var mongoose = require('libs/mongoose');
var async = require('async');


async.series([
    open,
    dropDatabase,
    requireModels,
    createUser
], function(err, res){
    console.log(arguments);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
})

function open (callback){
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback){
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback){
    require('models/user');

    async.each(Object.keys(mongoose.models), function(modelName, callback){
        mongoose.models[modelName].ensureIndexes(callback);
    },callback);
}

function createUser(callback){

    var users = [
        {username:"Вася", password:"vpass"},
        {username:"Вася", password:"ppass"},
        {username:"Админ", password:"apass"}
    ]
    async.each(users, function(userData,callback){
        var user = new mongoose.models.User(userData);
        user.save(callback);
    },callback);
}




//
//var user = new User({
//    username:"Tester2",
//    password:"pass"
//});
//
//user.save(function(err, user, affected) {
//    if (err) throw err;
//    User.findOne({username:"Tester"}, function(err, tester){
//        console.log(tester);
//    })
//});