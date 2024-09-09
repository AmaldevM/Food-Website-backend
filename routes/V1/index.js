const express = require('express');

const { userRouter } = require('./userRoutes');
const { restRouter } = require('./restRouter');

const v1Router = express.Router()

v1Router.use('/user', userRouter)
v1Router.use('/rest', restRouter);


module.exports = { v1Router }
