const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('createPost');
});

router.post('/', (req, res) => {
    console.log(req.body)
    console.log(req.query)
});

module.exports = router;