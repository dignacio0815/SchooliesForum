const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    
    let stmt = 'select * from USERS where USERNAME = ?';
    let data = [req.session.user];
    
    // let user_info = await query(stmt, data);
    let user_info = "something";
    
    res.render('account', { user : user_info, username_taken : false, password_match : true });
    
});

router.post('/', async function(req, res) {
    
    let stmt = 'select * from USERS where USERNAME = ?';
    let data = [req.session.user];
    
    let user_info = await query(stmt, data);
    
    let new_user_info = {"firstname" : req.body.firstname, "lastname" : req.body.lastname, "username" : req.body.username, "bio" : req.body.bio};
    
    let username_taken = await query(stmt, [new_user_info.username]);
    
    let u_taken = false;
    let p_mismatch = true;
    
    if(req.body.password != user_info.password || (username_taken.length != 0 && username_taken.username != req.session.user) ) {
        
        if(username_taken.length != 0 && username_taken.username != req.session.user) {
            
            // res.render('account', { user : user_info, username_taken : false, password_match : false });
            
            u_taken = true;
            
        }
        if(req.body.password != user_info.password) {
            
            // res.render('account', { user : new_user_info, username_taken : false, password_match : true });
            
            p_mismatch = false;
    
        }
        
        res.render('account', { user : new_user_info, username_taken : u_taken, password_match : p_mismatch });
        
    }
    else {
        
        let update_stmt = "update USERS set firstname = ?, lastname = ?, username = ?, bio = ? where USERNAME = ?";
        
        await query(update_stmt, [new_user_info.firstname, new_user_info.lastname, new_user_info.username, new_user_info.bio, req.session.user]);
        
        req.session.user = new_user_info.username;
        
    }


    res.redirect('user/' + req.session.user);
    
    
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