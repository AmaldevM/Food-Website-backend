const express = require("express");
const { userSignup, userLogin } = require("../../controllers/userController");

const router = express.Router();


router.post('/signup', userSignup );
router.post('/login', userLogin );
router.post('/logout');
router.get('/check-user');
router.get('/userList');
router.get('/profile');
router.put('/update');
router.delete('/delete');

module.exports = { userRouter: router };