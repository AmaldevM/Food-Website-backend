const express = require('express')

const router = express.Router()

// Create order
router.post('/order')
// Get order
router.get('/orders')
// Get order by id
router.get('/order/:id',)
// Update order
router.put('/order/:id/status')

module.exports = { orderRouter: router }