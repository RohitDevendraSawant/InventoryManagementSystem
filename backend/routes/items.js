const express = require("express");
const router = express.Router();
const Item = require("../models/Items");
const fetchUser = require("../middleware/fetchUser");
const { body, validationResult } = require("express-validator");
const Items = require("../models/Items");
const { findByIdAndUpdate } = require("../models/Items");
const res = require("express/lib/response");

// Add items using POST, login required
router.post(
  "/addItem/",
  fetchUser,
  [
    body("lab", "Lab can't be empty.").exists(),
    body("machineNumber", "Machine number can't be empty.").exists(),
    body("name", "Username can't be empty.").exists(),
    body("category", "Category can't be empty.").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try {
      const { lab,machineNumber, name,category, date } = req.body;
      const item = new Item({
        lab,
        machineNumber,
        name,
        category,
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
  try {
    const {lab, machineNumber,name, category} = req.body;
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
    else if (machineNumber) {
      let items = await Item.findOne({machineNumber : machineNumber});
      return res.json(items)
    }
    
    let items = await Items.find();
    return res.json(items);

  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal server error. ");
  }
});

// Update items using PUT, login required
router.put("/updateItems/:id",fetchUser,async (req,res)=>{
  try{
    const {lab,machineNumber,name,category,date} = req.body;
    const newItem = {};
    if(lab){newItem.lab = lab};
    if(machineNumber){newItem.machineNumber = machineNumber};
    if (name){newItem.name = name};
    if (category){newItem.category = category}; 
    if (date){newItem.date = date}; 
    let item = await Item.findById(req.params.id);
    if(!item){
      return res.status(400).send("Item not found");
    }
    
    let note = await Item.findByIdAndUpdate(req.params.id,{$set:newItem},{new:true});
    res.json({note});
}
catch(error){
  console.log(error.message);
  res.status(500).json("Internal server error");
}
})


module.exports = router;
