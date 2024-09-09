const express = require('express')

const router = express.Router()

// Create address
router.post('/address',)
// Ppdate address
router.put('/address/:id',)
// Get address
router.get('/address', )
// Delete address
router.delete('/address/:id',)

module.exports = { addressRouter: router }