const express = require('express')

const router = express.Router()
// Admin registration
router.post("/register",)
// Admin login
router.post("/login", )
// Logout admin
router.post("/logout", )
// Update admin
router.put("/update/:id")

module.exports = {adminRouter: router}