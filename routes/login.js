const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

// router.post('/', ())
router.post('/', async function(req, res, next) {
    let stmt = 'SELECT * FROM Users WHERE username=? and password=?';
    let data = [req.body.username, req.body.password];
    let userLoggedIn = await query(stmt,data);
    if(userLoggedIn.length) {
        req.session.authenticated = true;
        req.session.user = req.body.username;
        res.redirect("landingPage");
        return;
    }
    res.render('login', {invalidLogin:true});
});

function query(stmt, data) {
    return new Promise(function(resolve, reject) {
        db.query(stmt, data, function(error, result) {
            if (error) throw error;
            
            resolve(result);
        });
    });
}

module.exports = router;