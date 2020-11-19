const express = require('express');
const router = express.Router();

router.get('/', isAuthenticated, async (req, res) => {
    
    let stmt = 'select * from USERS where USERNAME = ?';
    let data = [req.session.user];
    
    let user_info = await query(stmt, data);
    
    
    res.render('account', { user : user_info, username_taken : false, password_match : true });
    
});

router.post('/', async function(req, res) {
    
    let stmt = 'select * from USERS where USERNAME = ?';
    let data = [req.session.user];
    
    let user_info = await query(stmt, data);
    
    let new_user_info = {"firstname" : req.body.firstname, "lastname" : req.body.lastname, "username" : req.body.username, "bio" : req.body.bio};
    
    let username_taken = await query(stmt, [new_user_info.username]);
    
    if(req.body.password != user_info.password || username_taken.length != 0) {
        
        if(username_taken.length != 0) {
            
            res.render('account', { user : user_info, username_taken : false, password_match : false });
            
        }
        else {
            
            res.render('account', { user : new_user_info, username_taken : false, password_match : true });
    
        }
        
    }
    else {
        
        let update_stmt = "update USERS set firstname = ?, lastname = ?, username = ?, bio = ? where USERNAME = ?";
        
        await query(update_stmt, [new_user_info.firstname, new_user_info.lastname, new_user_info.username, new_user_info.bio, req.session.user]);
        
    }


    
    
    
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