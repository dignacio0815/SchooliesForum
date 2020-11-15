const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const mysql = require('mysql');
let port = process.env.PORT || 3000;

// Router Setup
let indexRouter = require('./routes/index');
let errorRouter = require('./routes/error');
let loginRouter = require('./routes/login');
let accountRouter = require('./routes/account');

app.use(express.static('public'));
app.use(express.static(__dirname + '/public'));
app.use( session ({ secret: "Gimme some Cheese", resave: true, saveUninitialized: true }));

// View engine set up
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', indexRouter);
app.use('*', errorRouter);
app.use('/login', loginRouter);
app.use('/account', accountRouter);


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

function dbConnection() {
    let conn = mysql.createConnection({
        host: 'ko86t9azcob3a2f9.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
        user: 'hpwto3xsc5rizajc',
        password: 'hvawdewg5btdb737',
        database: 'g3qs1bndvu07j9c5',
    })
    return conn;
};
let db = dbConnection();
db.connect((err) => {
    if(err) {
        console.log('error has occurred');
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

module.exports = app;

