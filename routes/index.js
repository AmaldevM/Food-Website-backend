const express = require('express')
const { v1Router } = require('./V1')
const apiRouter = express.Router()

apiRouter.use('/v1', v1Router)

module.exports = { apiRouter }

