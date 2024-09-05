const express = require('express')
const {v1Router} = require("./V1/index")

const router = express.Router()

router.use("/v1", v1Router)

module.exports={apiRouter:router}