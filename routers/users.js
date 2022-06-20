const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const User = require("../models/user");

const saltRounds = 10;

router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
});

router.post("/login", async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  });

  const match = await bcrypt.compare(req.body.password, user.password);
  if (match) {
    res.send("Login");
  }
  res.send("Worang Password or username");
});

router.post("/signup", async (req, res) => {
  const bcryptPassword = await bcrypt.hash(req.body.password, saltRounds);
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: bcryptPassword,
  });
  try {
    const userRes = await user.save();
    res.json(userRes);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
});

router.delete("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    const delRes = await user.remove();
    res.json(delRes);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
});

module.exports = router;
