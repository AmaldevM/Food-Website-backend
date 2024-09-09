const express = require('express')

const router = express.Router();

// Add review
router.post('/reviews')
// Get reviews
router.get('/reviews')

module.exports = {reviewRouter: router}