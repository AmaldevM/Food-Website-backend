const express = require('express');

const router = express.Router()

// Get all menu items for a restaurant
router.get('/allmenus');
// Get menu by id
router.get('/item/:id' )
// Create menu item
router.post('/allmenus')
// Update menus
router.put('/item/:id')
// Update menus
router.delete('/item/:id')

module.exports = { menusRouter: router }