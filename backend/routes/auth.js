const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

const secretToken = "authenticationSuccessfull"

//AUthenticate a user using POST, No login required.
router.post("/Login/",[
    // A username must be there
    body('username','Username can\'t be empty.').exists(),
],async(req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    const {username,password} = req.body;
    try{
        const user = await User.findOne({username});
        if(password !== user.password){
            return res.status(400).json({success, error: "Invalid credentials." });
        }

        const data = {
            user:{
                id : user.id
            }
        }

        const authToken = jwt.sign(data,secretToken);
        success = true
        res.json({success,authToken})
    }catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
})

module.exports = router;