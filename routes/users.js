'use strict'

const express = require('express');
const middleware = require('../middleware')
const { User } = require('../models')
const auth = require('basic-auth');
const bcryptjs = require('bcryptjs');
//express validator
const router = express.Router();


/**
 * GET /api/users 200 - Returns the currently authenticated user - Auth through middleware
 */
router.get('/users', middleware.authenticateUser, middleware.asyncHandler(async(req, res) => {
    const currentUser = req.currentUser;
    
    const user = await User.scope('withoutPassword', 'withoutTimestamps').findOne({
        where: {
            firstName: currentUser.firstName,
            emailAddress: currentUser.emailAddress
        }
    });

    res.status(200).json({
        user: user
    })
}));
/**
 * POST /api/users 201 - Creates a user, sets the Location header to "/", and returns no content
 */

router.post('/users', middleware.asyncHandler(async(req, res) => {
    const user = req.body;
    user.password = bcryptjs.hashSync(user.password)
    await User.create(user)
    res.location('/').status(201).end()
}));


module.exports = router;