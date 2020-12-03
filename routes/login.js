const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

// router.post('/', ())
router.post('/', async function(req, res, next) {
    console.log(req.body['login'])
    let username = req.body['login'][0];
    let password = req.body['login'][1];
    let userLoggedIn = await validateLogin(username, password);
    console.log(userLoggedIn);
    if(userLoggedIn.length) {
        req.session.authenticated = true;
        req.session.user = req.body.username;
        res.redirect("/landingPage");
        return;
    }
    res.render('login', {invalidLogin:true});
});

function validateLogin(username, password) {
    let stmt = 'SELECT * FROM Users WHERE username=? and password=?';
    let data = [username, password];
    return new Promise(function(resolve, reject) {
        db.query(stmt, data, function(error, results) {
            if (error) throw error;
            console.log(results);
            resolve(results);
        })
    });
};

module.exports = router;