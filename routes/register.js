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
            'X-Parse-Application-Id': 'ELy9Lbk60D9w1sMWlvL6uvZPYMY0UBqVRO6jizHI', // This is your app's application id
            'X-Parse-REST-API-Key': 'y81PidZPjGeVvkHV13PTTit54jlKKu9OUauRNwTh', // This is your app's REST API key
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