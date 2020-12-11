const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('createPost');
});

router.post('/', async function(req, res, next) {
    var title = req.body['title'];
    var description = req.body['post'];
    var username = req.session.user;
    var userId = await getUserId(username);
    var filteredUserId = userId[0]['userID'];
    insertPost(title, description, filteredUserId);
    res.redirect('/landingPage')
});

function insertPost(title, description, userID) {
    var stmt = 'INSERT into Posts (name, description, userID) VALUES (?, ?, ?)';
    var data = [title, description, userID];
    db.query(stmt, data, function(error, result) {
        if (error) throw error;
        return result;
    });
}

function getUserId(username) {
    var stmt = 'select userID from Users where username=?';
    var data = [username];
    return new Promise(function (resolve, reject) {
        db.query(stmt, data, function (error, result) {
            if (error) throw error;
            resolve(result)
        })
    })
};

module.exports = router;