const express = require("express");
const router = express.Router();
const Item = require("../models/Items");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

// Add items using POST, login required
router.post(
  "/addItem",
  fetchUser,
  [
    body("lab", "Lab can't be empty.").exists(),
    body("configurationNumber", "Machine number can't be empty.").exists(),
    body("name", "Username can't be empty.").exists(),
    body("category", "Category can't be empty.").exists(),
    body("subcategory", "subcategory can't be empty.").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      const { lab, configurationNumber, name, category, subcategory, date } =
        req.body;
      const item = new Item({
        lab,
        configurationNumber,
        name,
        category,
        subcategory,
        date,
      });
      const addItem = await item.save();
      res.status(200).json(addItem);
    } catch (error) {
      console.log(error.message);
      res.status(500).send({ error: "Internal server error." });
    }
  }
);

// Get items using GET, login required
router.get("/getItems/", fetchUser, async (req, res) => {
  try {
    const { lab, configurationNumber, name, category, subcategory } = req.body;
    if (lab && category) {
      let items = await Item.find({
        $and: [{ lab: lab }, { category: category }],
      });
      return res.status(200).json(items);
    } else if (lab && subcategory) {
      let items = await Item.find({
        $and: [{ lab: lab }, { category: category }],
      });
      return res.status(200).json(items);
    } else if (lab) {
      let items = await Item.find({ lab: lab });
      return res.status(200).json(items);
    } else if (name) {
      let items = await Item.find({ name: name });
      return res.status(200).json(items);
    } else if (category) {
      let items = await Item.find({ category: category });
      return res.status(200).json(items);
    } else if (subcategory) {
      let items = await Item.find({ subcategory: subcategory });
      return res.status(200).json(items);
    } else if (configurationNumber) {
      let items = await Item.findOne({
        configurationNumber: configurationNumber,
      });
      return res.status(200).json(items);
    }

    let items = await Item.find();
    return res.status(200).json(items);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal server error. ");
  }
});

// Update items using PUT, login required
router.put("/updateItems/:id", fetchUser, async (req, res) => {
  try {
    const {
      lab,
      configurationNumber,
      name,
      category,
      subcategory,
      date
    } = req.body;
    const newItem = {};
    if (lab) {
      newItem.lab = lab;
    }
    if (configurationNumber) {
      newItem.configurationNumber = configurationNumber;
    }
    if (name) {
      newItem.name = name;
    }
    if (category) {
      newItem.category = category;
    }
    if (subcategory) {
      newItem.subcategory = subcategory;
    }
    if (date) {
      newItem.date = date;
    }

    let item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(400).send("Item not found");
    }

    let update = await Item.findByIdAndUpdate(
      req.params.id,
      { $set: newItem },
      { new: true }
    );
    return res.status(200).json({ update });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json("Internal server error");
  }
});

module.exports = router;
