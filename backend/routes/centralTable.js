const express = require("express");
const router = express.Router();
const centralTable = require("../models/CentralTable");
const fetchUser = require("../middleware/fetchUser");

// Route 1 : add items into central table using POST : Login required
router.post("/addItem", fetchUser, async (req, res) => {
  try {
    const { name, quantity, price, date } = req.body;
    const item = new centralTable({
      name,
      quantity,
      price,
      date,
    });
    const addedItem = await item.save();
    res.status(200).json(addedItem);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error occured." });
  }
});

// Route 2 : Display items added in central table using GET : Login required
router.get("/getItem", fetchUser, async (req, res) => {
  try {
    let items = await centralTable.find();
    return res.status(200).json(items);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error occured." });
  }
});

// Route 3 : To edit items added in central table using PUT : Login required, id should be provided.
router.put("/updateItem/:id", fetchUser, async (req, res) => {
  try {
    const { name, quantity, price, date } = req.body;
    const updatedItem = {};
    if (name) {
      updatedItem.name = name;
    }
    if (quantity) {
      updatedItem.quantity = quantity;
    }
    if (price) {
      updatedItem.price = price;
    }
    if (date) {
      updatedItem.date = date;
    }

    let item = await centralTable.findById(req.params.id);
    if (!item) {
      res.status(404).json({ message: "Product not found" });
    }

    const update = await centralTable.findByIdAndUpdate(
      item,
      { $set: updatedItem },
      { new: true }
    );
    res.status(200).json({ update });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error occured." });
  }
});

// Route 4 : To delete items from central table using DELETE : login required, id should be provided

router.delete("/deleteItem/:id", fetchUser, async (req, res) => {
  try {
    let item = await centralTable.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Product not found" });
    }
    item = await centralTable.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Product has been deleted successfully." });
  } catch (error) {
    console.log(error.message);
    res.send(500).json({ message: "Internal server error occured." });
  }
});


module.exports = router;