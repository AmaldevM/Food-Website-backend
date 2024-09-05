const express = require('express');
const { userRouter } = require('./userRoutes');
const v1Router = express.Router()

v1Router.use('/user', userRouter)

module.exports = {v1Router}

// const express = require('express');
// const { userRoutes } = require("./userRoutes");
// const restRoutes = require('./restRoutes');

// const v1Router = express.Router();

// v1Router.use('/user', userRoutes)

// module.exports = { v1Router }; 
