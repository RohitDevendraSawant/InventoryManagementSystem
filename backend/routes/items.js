const express = require("express");
const router = express.Router();
const Item = require("../models/Items");
const { fetchStaff } = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");

// Add items using POST, login required
router.post("/addItem", fetchStaff, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { lab, configurationNumber, category, specification, date } =
      req.body;
    const item = new Item({
      lab,
      configurationNumber,
      category,
      specification,
      date,
    });
    const addItem = await item.save();
    res.status(200).json(addItem);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ error: "Internal server error." });
  }
});

// Get items using GET, login required
router.post("/getItems/:lab", fetchStaff, async (req, res) => {
  try {
    let items;
    const { configurationNumber, category, specification } = req.body;
    if (req.params.lab === "Not applicable" || req.params.lab === "Enter lab number") {
      items = await Item.find()
    }
    else{
      items = await Item.find({ lab: req.params.lab });
    }

    if (category && specification && configurationNumber) {
      // let itemsList = await items.find({
      //   $and: [{ category: category }, { subcategory: subcategory }],
      // });
      let itemsList = items.filter((ele) => {
        return (
          ele.category === category &&
          ele.specification === specification &&
          ele.configurationNumber === configurationNumber
        );
      });
      return res.status(200).json(itemsList);
    } else if (category && specification) {
      // let itemsList = await items.find({
      //   $and: [{ category: category }, { subcategory: subcategory }],
      // });
      let itemsList = items.filter((ele) => {
        return ele.category === category && ele.specification === specification;
      });
      return res.status(200).json(itemsList);
    } else if (category && configurationNumber) {
      // let itemsList = await items.find({
      //   $and: [{ category: category }, { subcategory: subcategory }],
      // });
      let itemsList = items.filter((ele) => {
        return (
          ele.category === category &&
          ele.configurationNumber === configurationNumber
        );
      });
      return res.status(200).json(itemsList);
    } else if (configurationNumber && specification) {
      // let itemsList = await items.find({
      //   $and: [{ category: category }, { subcategory: subcategory }],
      // });
      let itemsList = items.filter((ele) => {
        return (
          ele.configurationNumber === configurationNumber &&
          ele.specification === specification
        );
      });
      return res.status(200).json(itemsList);
    } else if (category) {
      let itemsList = items.filter((ele) => ele.category === category);
      return res.status(200).json(itemsList);
    } else if (specification) {
      let itemsList = await items.find({ subcategory: subcategory });
      return res.status(200).json(itemsList);
    } else if (configurationNumber) {
      let itemsList = items.filter(
        (ele) => ele.configurationNumber === configurationNumber
      );
      return res.status(200).json(itemsList);
    }
    return res.status(200).json(items);
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal server error.");
  }
});

// Update items using PUT, login required
router.put("/updateItems/:id", fetchStaff, async (req, res) => {
  try {
    const { configurationNumber, category, specification, date } =
      req.body;
    const newItem = {};
    if (configurationNumber) {
      newItem.configurationNumber = configurationNumber;
    }
    if (category) {
      newItem.category = category;
    }
    if (specification) {
      newItem.specification = specification;
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
