const express = require('express')


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

  module.exports = middleware;