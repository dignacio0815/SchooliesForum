const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index');

    // res.send('Hello World!')
});

router.post('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = router;