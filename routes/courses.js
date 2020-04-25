'use strict'

const express = require('express');
const middleware = require('../middleware');
const { Course, User } = require('../models');
const auth = require('basic-auth');
const { validationResult } = require('express-validator');
const validation = require('../middleware/validators');
const router = express.Router();

/**
 * GET /api/users 200 - Returns the courses with associated users
 */
router.get('/courses', middleware.authenticateUser, middleware.asyncHandler(async(req, res) => {
    //scope from models, strips info
    const courses = await Course.scope('withoutTimestamps').findAll({
        include:  [{
            model: User.scope('withoutPassword'),
            as: 'addedBy'
        }]
    })

    res.status(200).json({
        message: courses
    })
}));

/**GET /api/courses/:id 200 - Returns a the course (including the user that owns the course) for the provided course ID */

router.get('/courses/:id', middleware.authenticateUser, middleware.asyncHandler(async(req, res) => {
    const course = await Course.findByPk(req.params.id, {
        include: [{
            model: User.scope('withoutPassword'),
            as: 'addedBy'
        }]
    })
    res.status(200).json({
        course: course,
    })
}));

/**POST /api/courses 201 - Creates a course, sets the Location header to the URI for the course, and returns no content */
router.post('/courses', validation.course, middleware.authenticateUser, middleware.asyncHandler(async(req, res) => {
    const user = req.currentUser
    const errors = validationResult(req)

    if (!errors.isEmpty()){
        res.status(400).json(errors.array());
    } else {
        const course = await Course.create({
            title: req.body.title,
            description: req.body.description,
            estimatedTime: req.body.estimatedTime,
            materialsNeeded: req.body.materialsNeeded,
            userId: user.id
        })
        res.location('/').status(201).end();
    }
}));

/**PUT /api/courses/:id 204 - Updates a course and returns no content */
router.put('/courses/:id', middleware.authenticateUser, middleware.asyncHandler(async(req, res) => {
    const currentUser = req.currentUser;
    const course = await Course.findByPk(req.params.id)

    //only addedBy associated user can change course
    if (course.userId === currentUser.id){
        await course.update(req.body)
        res.status(204).end()
    } else {
        res.status(403).json({
            message: `Error 403 forbidden`
        })
    }

}));

/**DELETE /api/courses/:id 204 - Deletes a course and returns no content */
router.delete('/courses/:id', middleware.authenticateUser, middleware.asyncHandler(async(req, res) => {
    const currentUser = req.currentUser;
    const course = await Course.findByPk(req.params.id)

    //only addedBy associated user can delete course
    if (course.userId === req.currentUser.id) {
        await course.destroy()
        res.status(204).end()
    } else {
        res.status(403).json({
            message: `Error 403 forbidden`
        })
    }

}));

module.exports = router;