const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('login');
    // res.send('Hello World!')
});

module.exports = router;