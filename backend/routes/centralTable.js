const express = require("express");
const router = express.Router();
const centralTable = require("../models/CentralTable");
const Request = require("../models/Request");
const Item = require("../models/Items");
const MoveTo = require("../models/MoveTo");
const { fetchAssistant, fetchStaff } = require("../middleware/fetchUser");
const { findByIdAndUpdate } = require("../models/CentralTable");

// Route 1 : add items into central table using POST : Login required
router.post("/addItem", fetchAssistant, async (req, res) => {
  try {
    const { bill, category, specification, quantity, cost, date } = req.body;
    let item = await centralTable.findOne({
      $and: [{ category: category }, { specification: specification }],
    });

    if (item) {
      const updatedData = {};
      updatedData.quantity = item.quantity + Number(quantity);
      updatedData.cost = item.cost + Number(cost);
      const update = await centralTable.findByIdAndUpdate(
        item._id,
        { $set: updatedData },
        { new: true }
      );
      return res.status(200).json({
        message: "Product already existing hence updated the quantity",
      });
    }
    item = new centralTable({
      bill,
      category,
      specification,
      quantity,
      cost,
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
router.get("/getItem", fetchStaff, async (req, res) => {
  try {
    let items = await centralTable.find();
    return res.status(200).json(items);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error occured." });
  }
});

// Route 3 : To edit items added in central table using PUT : Login required, id should be provided.
router.put("/updateItem/:id", fetchAssistant, async (req, res) => {
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

router.delete("/deleteItem/:id", fetchAssistant, async (req, res) => {
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

// Route 5 : To get quantity in before requesting for items.

router.post("/getQuantity", fetchStaff, async (req, res) => {
  try {
    const { category, specification } = req.body;
    let product = await centralTable.find({ category, specification });
    console.log(product);
    if (!product[0]) {
      return res
        .status(400)
        .json({ message: "Product with these specifications in not in stock" });
    }
    const quantity = await product[0].quantity;
    return res
      .status(200)
      .json({ message: "Product exists", quantity: quantity });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error. " });
  }
});

router.post("/moveToLab/:id", fetchAssistant, async (req, res) => {
  try {
    const { lab, category, specification, date } = req.body;
    let product = await centralTable.findById(req.params.id);

    if (!product) {
      return res.status(400).json({ message: "Product not found" });
    }

    if (product.quantity <= 0) {
      return res.status(500).json("Product not exists");
    }
    let request = await Request.find({ lab, category, specification });
    console.log(request);

    if (!request[0]) {
      return res.status(400).json({ message: "No such request exists" });
    }

    if (request[0].recievedQuantity >= request[0].requiredQuantity) {
      return res
        .status(403)
        .json({ message: "Requirement already fulfilled for this request." });
    }

    let updatedReqData = {};
    updatedReqData.recievedQuantity = request[0].recievedQuantity + 1;
    if (request[0].requiredQuantity == request[0].recievedQuantity + 1) {
      updatedReqData.status = "Completed";
    }
    updatedReqData.bill = product.bill;
    const update = await Request.findByIdAndUpdate(
      request[0]._id,
      { $set: updatedReqData },
      { new: true }
    );
    console.log(request[0].lab, request[0].recievedQuantity);
    let updatedCentraData = {};
    updatedCentraData.quantity = product.quantity - 1;
    const updateCentralQuantity = await centralTable.findByIdAndUpdate(
      product._id,
      { $set: updatedCentraData },
      { new: true }
    );

    const item = new Item({
      lab,
      category,
      specification,
      date,
    });
    const addItem = await item.save();

    const prod = await MoveTo.find({
      $and: [{ prod_id: req.params.id }, { lab: lab }],
    });

    console.log("prod : ",prod);
    if (prod) {
      await MoveTo.findByIdAndUpdate(
        prod[0]._id,
        { $set: { quantity: request[0].recievedQuantity, date: date } },
        { new: true }
      );
    } else {
      const moved = new MoveTo({
        prod_id: req.params.id,
        date: date,
        lab: lab,
        quantity: request[0].recievedQuantity,
      });
      await moved.save();
    }

    return res.status(200).json({
      message: "operation successful.",
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/getMovedProducts/:id",fetchAssistant, async (req,res)=>{
  const products = await MoveTo.find({prod_id : req.params.id});
  return res.status(200).json(products);
})

module.exports = router;
