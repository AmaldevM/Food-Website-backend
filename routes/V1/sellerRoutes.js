const express = require('express')
const { registerSeller, loginSeller, logoutSeller, getSellersList } = require('../../controllers/sellerController')
const router = express.Router()

// Register seller
router.post('/register', registerSeller)
// Login seller
router.post('/login', loginSeller)
// logout seller
router.post('/logout', logoutSeller)
// get seller
router.get('/allSellers', getSellersList)


module.exports = {sellerRouter: router}