const express = require('express');
const auth = require('basic-auth');
const bcryptjs = require('bcryptjs');
const { User } = require('../models');


const middleware = {}


/* Handler function to wrap each route. */
 middleware.asyncHandler = (cb) => {
    return async(req, res, next) => {
      try {
        await cb(req, res, next)
      } catch(error){
        res.status(500).send(error);
      }
    }
  }
  /** Handler function to check user authentication*/
  middleware.authenticateUser = async(req, res, next) => {
    let message = null;
    let user = null;
    //parsed from Auth header
    var credentials = auth(req)

    if (credentials) {
         user = await User.findOne({
          where: {
            emailAddress: credentials.name
          }
        })

      if (user) {
        //check password
        const authenticated = bcryptjs.compareSync(credentials.pass, user.password)

        if (authenticated) {
          //store in req
          req.currentUser = user
        } else {
          message = `Authentication failed for username: ${user.emailAddress}`
        }
      } else {
        message = `User not found for username: ${credentials.name}`
      }
    } else {
      message = `Auth header not found`
    }
    if (message) {
      console.warn(message)
      res.status(401).json({
        message: `Access denied`
      })
    } else {
      next();
    }
  }


  module.exports = middleware;