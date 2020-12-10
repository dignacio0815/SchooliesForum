const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('createPost');
});

router.post('/', (req, res) => {
    var title = req.body['title'];
    var description = req.body['post'];
    insertPost(title, description);
    res.redirect('/landingPage')
});

function insertPost(title, description) {
    var stmt = 'INSERT into Posts (name, description) VALUES (?, ?)';
    var data = [title, description];
    db.query(stmt, data, function(error, result) {
        if (error) throw error;
        return result;
    });
}
module.exports = router;