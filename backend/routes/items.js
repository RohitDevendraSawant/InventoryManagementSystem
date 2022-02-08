const express = require("express");
const router = express.Router();
const Item = require("../models/Items");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const Items = require("../models/Items");

// Add items using POST, login required
router.post(
  "/addItem/",
  fetchUser,
  [
    body("lab", "Lab can't be empty.").exists(),
    body("name", "Username can't be empty.").exists(),
    body("category", "Category can't be empty.").exists(),
    body("quantity", "Username can't be empty.").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      const { lab, name,category, quantity, date } = req.body;
      const item = new Item({
        lab,
        name,
        category,
        quantity,
        date,
      });
      const addItem = await item.save();
      res.json(addItem);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ error: "Internal server error." });
    }
  }
);

// Get items using GET, login required
router.get("/getItems/", fetchUser, async (req, res) => {
  let success = false;
  try {
    const {lab, name, category} = req.body;
    if (lab && category) {
      let items = await Item.find({$and:[{lab : lab},{category : category}] });
      return res.json(items);
    }
    else if (lab) {
      let items = await Item.find({lab : lab});
      return res.json(items)
    }
    else if (name) {
      let items = await Item.find({name : name});
      return res.json(items)
    }
    else if (category) {
      let items = await Item.find({category : category});
      return res.json(items)
    }
    
    let items = await Items.find();
    return res.json(items);

  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal server error. ");
  }
});

module.exports = router;
