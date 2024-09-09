const express = require("express");
const { userSignup } = require("../../controllers/userController");

const router = express.Router();


router.post('/signup', userSignup );
router.post('/login');
router.post('/logout');
router.get('/check-user');
router.get('/userList');
router.get('/profile');
router.put('/update');
router.delete('/delete');

module.exports = { userRouter: router };