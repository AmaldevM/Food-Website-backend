const express = require("express");

const { userRouter } = require("./userRoutes");
const { restRouter } = require("./restRouters");
const { adminRouter } = require("./adminRouters");

const v1Router = express.Router()

v1Router.use("/user", userRouter)
v1Router.use("/rest", restRouter);
v1Router.use("/admin", adminRouter);



module.exports = { v1Router }
 