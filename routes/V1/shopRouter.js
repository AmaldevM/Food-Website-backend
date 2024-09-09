const express = require('express');

const router = express.Router()


// Get all reastaurant
router.get("/allRest",);
// Get reastarant by id
router.get("/rest/:id");
// Create new restaurant
router.post("/allRest");
// Updata ratauarant
router.put("/rest/:id");
// Delete restaurant
router.delete("/rest/:id")


module.exports = { restRouter: router };
