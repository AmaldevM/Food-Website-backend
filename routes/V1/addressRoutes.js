const express = require('express');
const { createAddress, updateAddress } = require('../../controllers/addressController');
const { userAuth } = require('../../middlewares/userAuth');

const router = express.Router();

// Create address
router.post('/address', userAuth, createAddress);

// Update address (no need for :id since you're fetching it from req.user)
router.put('/address', userAuth, updateAddress);

module.exports = { addressRouter: router };
