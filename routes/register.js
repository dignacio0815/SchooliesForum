const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();

router.get("/", async function(req, res) {
    
    let listOfSchools = await getSchools();
    
    console.log(listOfSchools);
    
    res.render("register", { schools : listOfSchools } );
});

router.post("/", function(req, res) {
    console.log(req.body);
    let username = req.body.username;
    let password = req.body.password;
    let fName = req.body.fName;
    let lName = req.body.lName;
    let university = req.body.university;
    let grade = req.body.grade;
    var stmt = 'INSERT into Users (username, password, firstName, lastName, university, grade) VALUES (?, ?, ?, ?, ?, ?)';
    var data = [username, password, fName, lName, university, grade];
    db.query(stmt, data, function(error, result) {
        if (error) throw error;
        res.redirect("/login");
    });
});




function getSchools() {
  
  
   return new Promise(function(resolve, reject) {
        
        (async () => {
      const response = await fetch(
        'https://parseapi.back4app.com/classes/Usuniversitieslist_University?limit=4000&order=name',
        {
          headers: {
            'X-Parse-Application-Id': 'Kxo6yqc0xFRrir3JXuDuxCNCCrBwexwgg0HpsVT5', // This is your app's application id
            'X-Parse-REST-API-Key': '9cI6RkUsOaRm6WGGAt2a9r1NeRgwbo45Hl7OtFwt', // This is your app's REST API key
          }
        }
      );
      const data = await response.json(); // Here you have the data that you need
    //   console.log(JSON.stringify(data, null, 2));
      
      // console.log(data.results)
      
      resolve(data.results);
    
      
      
    })();
        
        
        
    });
  

    

}


module.exports = router;
