var User = require('models/user').User;
var Chat = require('models/chats').Chat;
var util = require('util');
var async = require('async');
var mongoose = require('libs/mongoose'), Schema = mongoose.Schema;

var schema = new Schema({
    chat_id:{
        type:String,
        required:true
    },
    dt:{
        type:Date,
        default:Date.now
    },
    body:{
        type:String,
        required:true
    },
    bot:{
        type:Boolean,
        required:true
    }
});


schema.statics.saveMess = function(chat_id, mess_data, callback){
    var Mess = this;

    var mess = new Mess({chat_id:chat_id, dt:mess_data.dt, body:mess_data.body, bot:mess_data.bot});
    mess.save(function(err){
        if(err) return callback(err);
        callback(null, mess);
    })
}


schema.statics.getHistory = function(dt, chat_id, callback){
    console.log('Mess.findOne', dt, chat_id);
    var Mess = this;
    Mess.find({chat_id: chat_id}).select('chat_id body bot dt').exec(function(err, hist){
        console.log('Mess.findOne', err, hist);
        callback(null, hist);
    });


    //var mess = new Mess({chat_id:chat_id, dt:mess_data.dt, body:mess_data.body, bot:mess_data.bot});
    //mess.save(function(err){
    //    if(err) return callback(err);
    //    callback(null, mess);
    //})
}


exports.Message = mongoose.model('Message', schema);