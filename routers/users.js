const express = require("express");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

const router = express.Router();
const User = require("../models/user");
const verifyToken = require("../middleware/auth");

const saltRounds = 10;

router.get("/", verifyToken, async (req, res) => {
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
    const token = jwt.sign(
      { name: user.name, id: user.id },
      process.env.TokenSecret,
      { expiresIn: "2h" }
    );

    res.json({
      accessToken: token,
      name: user.name,
      id: user.id,
      email: user.email,
    });
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

router.delete("/:id", verifyToken, async (req, res) => {
  const user = await User.findById(req.params.id);

  try {
    const delRes = await user.remove();
    res.json(delRes);
  } catch (error) {
    res.send(`Error: ${error}`);
  }
});

module.exports = router;
