'use strict'

const express = require('express');
const middleware = require('../middleware')
const { Course, User } = require('../models')
//express validator
const router = express.Router();

// const Course = models

/**
 * GET /api/users 200 - Returns the currently authenticated user
 */
router.get('/courses', async(req, res) => {
    console.log(`Hello`)
    console.log(Course)
    
    try {

        const course = await Course.findAll()
        res.status(200).json({
            message: course
        })
        console.log(course)
    } catch(error) {
        console.log(error)
    }
});

module.exports = router;