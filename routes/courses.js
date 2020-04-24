'use strict'

const express = require('express');
const middleware = require('../middleware')
const { Course, User } = require('../models')
//express validator
const router = express.Router();

/**
 * GET /api/users 200 - Returns the courses with associated users
 */
router.get('/courses', middleware.authenticateUser, middleware.asyncHandler(async(req, res) => {
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

router.post('/courses', middleware.authenticateUser, middleware.asyncHandler(async(req, res) => {
    const user = req.currentUser
    const course = await Course.create({
        title: req.body.title,
        description: req.body.description,
        estimatedTime: req.body.estimatedTime,
        materialsNeeded: req.body.materialsNeeded,
        userId: user.id
    })
    res.location('/').status(201).end()
}));

/**PUT /api/courses/:id 204 - Updates a course and returns no content */
router.put('/courses/:id', middleware.authenticateUser, middleware.asyncHandler(async(req, res) => {
    const course = await Course.findByPk(req.params.id)
    await course.update(req.body)
    res.location('/').status(204).end()
}));

/**DELETE /api/courses/:id 204 - Deletes a course and returns no content */
router.delete('/courses/:id', middleware.authenticateUser, middleware.asyncHandler(async(req, res) => {
    const course = await Course.findByPk(req.params.id)
    await course.destroy()
    res.location('/').status(204).end()
}));

module.exports = router;