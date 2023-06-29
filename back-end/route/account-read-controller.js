const express = require("express");
const connectdb = require("../dbconnect");
const User = require("../models/user")
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.route("/login").post(async (req, res) => {
  try{
    let { email, password } = req.body
    if(!email || !password) return res.status(403).json("Email or Password is missing.")
    let user = await User.findOne({ email : email.trim() })
    if(!user) return res.status(404).json("User not found.")
    if(!bcrypt.compareSync(password, user.password))  return res.status(401).json("Unauthorized.")
    res.status(200).json({
      token : jwt.sign({ id: user._id, email: user.email, iat: Date.now(), exp: Date.now() + 604800000 },'alabama'),
      email
    })
  }catch(err){ res.status(500).json(err.message) }
})
router.route("/register").post(async (req, res) => {
  try{
    let { email, password } = req.body
    if(!email || !password) return res.status(403).json("Email or Password is missing.")
    password = bcrypt.hashSync(password, 10)
    let user = await User({email,password}).save()
    const token = jwt.sign({ id: user._id, email: user.email, iat: Date.now(), exp: Date.now() + 604800000 },'alabama')
    res.status(200).json({
      token,
      email
    })
  }catch(err){
    res.status(500).json(err.message)
  }
})

module.exports = router;
