var express = require('express');
var connect = require('connect');
var errorhandler = require('errorhandler');
var http = require('http');
var path = require('path');
var config = require('config');
var log = require('libs/log')(module);
var favicon = require('serve-favicon');
var session = require('express-session');
var mongoose = require('libs/mongoose')
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var HttpError = require('error').HttpError;

var app = express();

app.use(favicon(__dirname + '/public/img/favicon.ico'));

app.engine('ejs', require('ejs-locals'));
app.set('views', path.join(__dirname, 'tpl'));

app.set('view engine', 'ejs');

if (app.get('env') === 'development') {
    app.use(logger('dev'));
}else{
    app.use(logger('combined'));
}

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({extended: false}) );

app.use(cookieParser());

var MongoStore = require('connect-mongo')(session);

app.use(session({
    secret: config.get('session:secret'),
    key: config.get('session:key'),
    cookie: config.get('session:cookie'),
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    saveUninitialized:false,
    resave: false
}));

app.use(require('middleware/sendHttpError'));
app.use(require('middleware/loadingUser'));

require('routes')(app);

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(err, req, res, next) {
    if (typeof err == 'number') {
        err = new HttpError(err);
    }

    if (err instanceof HttpError){
        res.sendHttpError(err);
    }else {
        if (app.get('env') === 'development') {
            errorhandler(err, req, res, next);
        } else {
            log.error(err);
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});

http.createServer(app).listen(config.get('port'), function(){
    log.info('Express server listing on port ' + config.get('port'));
})


//module.exports = app;
