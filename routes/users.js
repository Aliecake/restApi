'use strict'

const express = require('express');
const middleware = require('../middleware')
const { User } = require('../models')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const validation = require('../middleware/validators')
const router = express.Router();



/**
 * GET /api/users 200 - Returns the currently authenticated user - Auth through middleware
 */
router.get('/users', middleware.authenticateUser, middleware.asyncHandler(async(req, res) => {
    const currentUser = req.currentUser;
    //scope from models, strips info
    const user = await User.scope('withoutPassword', 'withoutTimestamps').findOne({
        where: {
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

router.post('/users', validation.user, middleware.asyncHandler(async(req, res) => {
    const user = req.body;
    let errors = validationResult(req)

    if(!errors.isEmpty()){
        res.status(400).json(errors.array())
    } else {
        user.password = bcryptjs.hashSync(user.password)
        await User.create(user)
        res.location('/').status(201).end()
    }
}));


module.exports = router;