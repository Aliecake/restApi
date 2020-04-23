'use strict'

const express = require('express');

const router = express.Router();

router.get('/courses', (req, res) => {
    res.json({
        message: `Hello from courses`
    })
})


module.exports = router;