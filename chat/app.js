var express = require('express');
var connect = require('connect');
var errorhandler = require('errorhandler');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('libs/log')(module);
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
app.set('port', config.get('port'))

app.set('views', path.join(__dirname, 'views'));

app.set('view engine', 'ejs');

app.use(favicon(__dirname + '/public/img/favicon.ico'));

http.createServer(app).listen(app.get('port'), function(){
    log.info('Express server listing on port ' + config.get('port'));
})

app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
//
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res, next){
    res.render('chat_page',{});
});
//app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res) {
    res.send(404, "Page not found. Sorry")
});


app.use(function(err, req, res, next) {
    if (app.get('env') === 'development') {
        errorhandler(err, req, res, next);
    }else{
        app.send(500);
    }
});
if (app.get('env') === 'development') {

    app.use(logger('dev',{immediate:true}));
}else{
    app.use(logger('default'));
}

//module.exports = app;
