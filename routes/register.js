const express = require('express');
const router = express.Router();

router.get("/", function(req, res) {
    res.render("register");
});

router.post("/", function(req, res) {
    let username = req.body.username;
    let password = req.body.psw;
    console.log(username);
    console.log(password);
    var stmt = 'INSERT into USERS (username, password) VALUES (?, ?)';
    var data = [username, password];
    db.query(stmt, data, function(error, result) {
        if (error) throw error;
        res.redirect("/login");
    });
});
module.exports = router;