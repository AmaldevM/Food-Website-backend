const express = require('express')

const router = express.Router()

// Add item to cart
router.post('/addCart',)
// Get cart
router.get('/getCart')
// Remove cart
router.delete('/remove')

module.exports = {cartRouter: router}