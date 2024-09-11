const express = require('express')
const { createAddress, updateAddress } = require('../../controllers/addressController')
const { userAuth } = require('../../middlewares/userAuth')

const router = express.Router()

// Create address
router.post('/address', userAuth ,updateAddress )
// update address
router.put('/address/:id',userAuth, updateAddress)

module.exports = { addressRouter: router }