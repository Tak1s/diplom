var User = require('models/user').User;
var async = require('async');
var mongoose = require('libs/mongoose'), Schema = mongoose.Schema;

var schema = new Schema({
    user_id:{
        type:String,
        required:true
    },
    dt:{
        type:Date,
        default:Date.now
    }
});


schema.statics.createChat = function(user_id, callback){
    var Chat = this;

    var chat = new Chat({user_id:user_id});
    chat.save(function(err){
        if(err) return callback(err);
        callback(null, chat);
    });

}


exports.Chat = mongoose.model('Chat', schema);