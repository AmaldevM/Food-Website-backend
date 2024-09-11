const express = require("express");
const {
  getMenuItems,
  createMenuItem,
  getMenuItemById,
  updateMenu,
  deleteMenuItem,
} = require("../../controllers/menuController");
const { upload } = require("../../middlewares/multer");
const { sellerAuth } = require("../../middlewares/sellerAuth");
const router = express.Router();

// Get all menu items for a restaurant
router.get("/allmenus", getMenuItems);
// Get menu by id
router.get("/item/:id", getMenuItemById);
// Create menu item
router.post("/allmenus", sellerAuth, upload.single("image"), createMenuItem);
// Update menus
router.put("/item/:id", sellerAuth, updateMenu);
// Update menus
router.delete("/item/:id", sellerAuth, deleteMenuItem);

module.exports = { menuRouter: router };
