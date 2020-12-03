const express = require('express');
const router = express.Router();

router.get("/", function(req, res) {
    res.render("register");
});

router.post("/", function(req, res) {
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    let fName = req.body.fName;
    let lName = req.body.lName;
    let university = req.body.university;
    let grade = req.body.grade;
    // console.log(fName)
    // console.log(lName)
    // console.log(university)
    // console.log(grade)
    var stmt = 'INSERT into Users (username, password, firstName, lastName, university, grade) VALUES (?, ?, ?, ?, ?, ?)';
    var data = [username, password, fName, lName, university, grade];
    db.query(stmt, data, function(error, result) {
        if (error) throw error;
        res.redirect("/login");
    });
});
module.exports = router;