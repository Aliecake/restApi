'use strict'

const express = require('express');
const middleware = require('../middleware')
const { Course, User } = require('../models')
//express validator
const router = express.Router();

/**
 * GET /api/users 200 - Returns the currently authenticated user
 */
router.get('/users', async(req, res) => {
    console.log(`Hello`)
    
    try {

        const user = await User.findAll()
        res.status(200).json({
            message: user
        })
        console.log(user)
    } catch(error) {
        console.log(error)
    }
    
   

});
/**
 * POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
 */
//firstName, lastName, emailAddress, password

router.post('/users', middleware.asyncHandler(async(req, res) => {

    
    const user = await User.create(req.body)
    res.status(200).json({
        message:  user
    })
}));


module.exports = router;