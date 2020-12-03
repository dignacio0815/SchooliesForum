const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
});

// router.post('/', ())
router.post('/', async function(req, res, next) {
    
    let stmt = 'SELECT * FROM Users WHERE username=? and password=?';
    
    console.log(req.body.username);
    
    let data = [req.body.username, req.body.password];
    
    let userLoggedIn = await query(stmt,data);
    
//     console.log(req.body['login'])
//     let username = req.body['login'][0];
//     let password = req.body['login'][1];
//     let userLoggedIn = await validateLogin(username, password);

    console.log(userLoggedIn);
    if(userLoggedIn.length) {
        req.session.authenticated = true;
        req.session.user = req.body.username;
        res.redirect("landingPage");
        return;
    }
    res.render('login', {invalidLogin:true});
});

// function validateLogin(username, password) {
//     const db = dbConnection();
//     db.connect(function(err) {
//         if (err) {
//             console.log('error when connecting to db:', err);
//         }
//     });
//     let stmt = 'SELECT * FROM users WHERE username=? and password=?';

//     let data = [username, password];
//     return new Promise(function(resolve, reject) {
//         db.query(stmt, data, function(error, results) {
//             if (error) throw error;
//             console.log(results);
//             resolve(results);
//         })
//     });
// };

function query(stmt, data) {
    return new Promise(function(resolve, reject) {
        db.query(stmt, data, function(error, result) {
            if (error) throw error;
            
            resolve(result);
        });
    });
}


module.exports = router;