const express = require('express')
const path = require('path');
const session = require('express-session');
const app = express();
let port = process.env.PORT || 3000;

// Router Setup
let indexRouter = require('./routes/index');
let logigRouter = require('./routes/login');
let accountRouter = require('./routes/account');

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use( session ({ secret: "Gimme some Cheese", resave: true, saveUninitialized: true }));

// View engine set up
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', indexRouter);
app.use('/login', logigRouter);
app.use('/account', accountRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = app;