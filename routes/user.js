const express = require('express');
const router = express.Router();

router.get('/:username', async (req, res) => {
    
    let user_stmt = 'select * from Users where username = ?';
    
    let user_data = [req.params.username];
    
    console.log(req.params.username);
    
    let user_details = await query(user_stmt, user_data);
    
    console.log(user_details[0]);
    
    res.render('user', { user : user_details[0] } );
    
});

router.post('/', async function(req, res) {
    
    
    
});

function isAuthenticated(req, res, next){
    if(!req.session.authenticated) res.redirect('/login');
    else next();
}

function query(stmt, data) {
    return new Promise(function(resolve, reject) {
        db.query(stmt, data, function(error, result) {
            if (error) throw error;
            
            resolve(result);
        });
    });
}

module.exports = router;