const express = require('express');
const router = express.Router();

router.get('/', isAuthenticated, async (req, res) => {
    
    let stmt = 'select * from Users where USERNAME = ?';
    let data = [req.session.user];
    
    let user_info = await query(stmt, data);
    // let user_info = "something";
    
    // console.log(user_info[0]);
    
    res.render('account', { user : user_info[0], password_match : true });
    
});

router.post('/', async function(req, res) {
    
    let stmt = 'select * from Users where USERNAME = ?';
    let data = [req.session.user];
    
    let user_info = await query(stmt, data);
    
    // console.log(user_info[0], "\n old info" );
    
    let new_user_info = { "firstName" : req.body.firstname, "lastName" : req.body.lastname, "bio" : req.body.bio};
    
    console.log(new_user_info, "\n new info" );
    
    // let username_taken = await query(stmt, [new_user_info.username]);
    
    let p_mismatch = true;
    
    if(req.body.password != user_info[0].password ) {
        
        // if(username_taken.length != 0 && username_taken.username != req.session.user) {
            
        //     // res.render('account', { user : user_info, username_taken : false, password_match : false });
            
        //     u_taken = true;
        //     console.log("username taken\n");
            
        // }
        if(req.body.password != user_info.password) {
            
            // res.render('account', { user : new_user_info, username_taken : false, password_match : true });
            
            p_mismatch = false;
            console.log("password no matchy\n");
    
        }
        
        res.render('account', { user : new_user_info, password_match : p_mismatch });
        
    }
    else {
        
        let update_stmt = "update Users set firstname = ?, lastname = ?, bio = ? where USERNAME = ?";
        
        await query(update_stmt, [new_user_info.firstName, new_user_info.lastName, new_user_info.bio, req.session.user]);
        
        console.log("updating user info");
        
        res.redirect('user/' + req.session.user);
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