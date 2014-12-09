'use strict';

//print attributes and functions of an object
function getMethods(obj) {
    var result = [];
    for (var id in obj) {
        try {
   //   if (typeof(obj[id]) == "function") {
    result.push(id + ": " + obj[id].toString());
    //  }
} catch (err) {
    result.push(id + ": inaccessible");
}
}
return result;
}



module.exports = function(dbConnection){

    var express = require('express');
    var cookieParser = require('cookie-parser')
    var bodyParser = require('body-parser')
    var multer  = require('multer') //Multer is a node.js middleware for handling multipart/form-data.
    var session=require('express-session')
    var MongoStore = require('connect-mongo')(session)
    var passport = require('passport');//require('./auth')
    var path = require('path');
    var logger = require('morgan');
    var cookieParser = require('cookie-parser');

    var app = express();

//application logic




    app.set('view engine', 'jade');
    app.set('views', __dirname + '/views');

    app.use(cookieParser());
    app.use(session({
        secret:'keyboard cat', // The secret is going to be used to encrypt the session information.
        resave:true,             //https://github.com/expressjs/session#options
        saveUninitialized:true,  //https://github.com/expressjs/session#options
        store: new MongoStore({//'db': 'flights_sessions'
            mongoose_connection:dbConnection
        })  //can be separated to a settings file to make sure it is a parameter for 
    }))

    // app.use(passport.initialize());
    // app.use(passport.session()); //tell passport to use sessions in express. you can use passport without session (for non continous req/responses)

    app.use(passport.initialize());
    app.use(passport.session());

    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
    app.use(multer())

    app.use(logger('dev'));

    app.use(express.static(path.join(__dirname, 'public')));


    app.use(function(req,res,next){
        res.set('X-Powered-By', 'Flight Tracker');
        next();
    })

    //----------------------------------------- basic form test
    // app.get('/form', function(req, res) {
    //     console.log('HERE:------------ /form get')
    //     res.render('login', {title:'Log in'})
    // });

    // app.post('/form', function(req, res) {
    //     console.log('HERE:---------- /form post')
    //     console.log(req.body.username)
    //     res.json({username:req.body.username, password:req.body.password})
    // });

    //------------------------------------------ login


    // app.get('/login',function(req, res) {
    //     res.render('login', {title: 'Log in'});
    // });

    // app.post('/auth/signin', passport.authenticate('local', {
    //     failureRedirect: '/auth/signin',
    //     successRedirect: '/users/me'
    // }));

    // app.get('/user', function(req, res) {
    //     console.log('HERE:------------ /user')

    //     if(req.session.passport.user === undefined){
    //         res.redirect('/login');
    //     }else{
    //         res.render('user', {title:'Welcome!', user:req.user})
    //     }
    // });

    //------------------------------------------


   // app.use('/flights', routes);
   // 
   require('./routes/books')(app);
   require('./routes/articles.server.routes')(app);

    // require('./routes/index')(app);
    require('./routes/about')(app);

    var u = require('./routes/users.server.routes')(app);


    app.get('/*', function(req, res) {
        res.status(404).send('unknown path was provided');
    });

    //----------------------------------------- Error handling
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // development error handler
    // will print stacktrace
    if (app.get('env') === 'development') {
        app.use(function(err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // production error handler
    // no stacktraces leaked to user
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });

//--------------------------- setup mailer
    // var smtpTransport = nodemailer.createTransport("SMTP",{
    //     service: "Gmail",
    //     auth: {
    //        user: "awesome.mail.ly@gmail.com",
    //        pass: "test12345678"
    //     }
    // });
    

    return app
    //module.exports = app;
}
