const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

// router.post('/', ())
router.post('/', async function(req, res, next) {
    let userLoggedIn = await validateLogin(req.body.username, req.body.password);
    console.log(userLoggedIn);
    console.log();
    if(userLoggedIn.length) {
        req.session.authenticated = true;
        req.session.user = req.body.username;
        res.redirect("landingPage");
        return;
    }
    res.render('login', {invalidLogin:true});
});

function validateLogin(username, password) {
    const db = dbConnection();
    db.connect(function(err) {
        if (err) {
            console.log('error when connecting to db:', err);
        }
    });
    let stmt = 'SELECT * FROM users WHERE username=? and password=?';
    let data = [username, password];
    return new Promise(function(resolve, reject) {
        console.log(db + '\n');
        db.query(stmt, data, function(error, results) {
            if (error) throw error;
            console.log(results);
            resolve(results);
        })
        db.end();
    });
};

module.exports = router;