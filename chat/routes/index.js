var checkAuth = require('middleware/checkAuth');

module.exports = function(app) {

    app.get('/', require('./frontpage').get);

    app.get('/login', require('./login').get);
    app.post('/login', require('./login').post);
    app.post('/logout', require('./logout').post);

    app.get('/chat', checkAuth, require('./chat').get);

    //app.get('/chat', function (req, res, next) {
    //    res.render('chat_page', {});
    //});
    //
    //var User = require('models/user').User;
    //app.get('/users', function (err, res, next) {
    //    User.find({}, function (err, users) {
    //        if (err) return next(err);
    //        res.json(users);
    //    });
    //});
    //
    //app.get('/users/:id', function (req, res, next) {
    //    try {
    //        var id = new ObjectID(req.params.id);
    //    }catch(e){
    //        next(404);
    //        return;
    //    }
    //    User.findById(id, function (err, user) {
    //        if (err) return next(err);
    //        if (!user) {
    //            next(new HttpError(404, "User not fount"));
    //        }
    //        res.json(user);
    //    });
    //});

}