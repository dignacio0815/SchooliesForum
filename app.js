const express = require('express');
const path = require('path');
const session = require('express-session');
var bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
let port = process.env.PORT || 3000;

// Router Setup
let indexRouter = require('./routes/index');
let errorRouter = require('./routes/error');
let loginRouter = require('./routes/login');
let accountRouter = require('./routes/account');
let userRouter = require('./routes/user');
let createPostRouter = require('./routes/createPost');

app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use( session ({ secret: "Gimme some Cheese", resave: true, saveUninitialized: true }));

// View engine set up
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/account', accountRouter);
app.use('/user', userRouter);
app.use('/createPost', createPostRouter);
app.use('*', errorRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

function dbConnection() {
    let conn = mysql.createConnection({
        host: 'ko86t9azcob3a2f9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'hpwto3xsc5rizajc',
        password: 'hvawdewg5btdb737',
        database: 'g3qs1bndvu07j9c5'
    })
    return conn;
};

// function isAuthenticated(req, res, next){
//     if(!req.session.authenticated) res.redirect('/login');
//     else next();
// }

let db = dbConnection();

db.connect((err) => {
    if(err) {
        console.log('error has occurred');
        throw err;
    }
    console.log('Connected to database');
});

global.db = db;
// global.isAuthenticated = isAuthenticated;

module.exports = app;

