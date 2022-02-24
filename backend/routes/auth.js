const express = require('express');
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const secretToken = "authenticationSuccessfull"

//Authenticate a user using POST, No login required.
router.post("/Login/",[
    // A username must be there
    body('email','Enter a valid email').isEmail(),
],async(req,res)=>{
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    };
    try{
        const {email,password} = req.body;
        const user = await User.findOne({email});
        if(password !== user.password){
            return res.status(400).json({success, error: "Invalid credentials." });
        }

        const data = {
            user:{
                id : user.id
            }
        };
        const authToken = jwt.sign(data,secretToken);
        success = true
        res.json({success,authToken})
    }catch(error){
        console.error(error.message)
        res.status(500).send("Internal server error");
    }
})

// Add a user using POST, Admin must be login
router.post("/signup/",fetchUser,[
    body('name','Name can\'t be empty.').isLength({ min: 5 }),
    body('role','Role can\'t be empty.').exists(),
    body('email','Name can\'t be empty.').isEmail(),
    body('password','Password should be greater than 8 characters.').isLength({ min: 8 }),
    body('confirmPassword','Password should be greater than 8 characters.').isLength({ min: 8 }),
],
async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }

    try {
        const {name,role,email,password,confirmPassword} = req.body;
        const user = await User.findOne({email});
        if (user){
            res.status(403).send("User with this email already exists.");
        };

        user = new User({
            name,role,email,password,confirmPassword
        });

        const newUser = await user.save();

        res.json(newUser)
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error.");
    }
})

module.exports = router;