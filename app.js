const express = require('express')
const path = require('path');
const app = express();
let port = process.env.PORT || 3000;

// Router Setup
let indexRouter = require('./routes/index');
let errorRouter = require('./routes/error');

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));

// View engine set up
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('*', errorRouter);

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});

module.exports = app;