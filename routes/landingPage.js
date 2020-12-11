const express = require('express');
const router = express.Router();

router.get('/', async function(req, res) {
    var username = req.session.user;
    var userID = await getUserId(username);
    var posts = await getPostsNotFromUser(userID);
    res.render('landingPage', {data : posts});
});

router.post('/', (req, res) => {
    res.send('Hello World!');
});

function getUserId(username) {
    var stmt = 'select userID from Users where username=?';
    var data = [username];
    return new Promise(function (resolve, reject) {
        db.query(stmt, data, function (error, result) {
            if (error) throw error;
            resolve(result[0]['userID'])
        })
    })
};

function getPostsNotFromUser(userID) {
    var stmt = "select * from Posts where userID != ?"
    var data = [userID];
    return new Promise(function (resolve, reject) {
        db.query(stmt, data, function (error, result) {
            if (error) throw error;
            resolve(result)
        })
    })
}

module.exports = router;