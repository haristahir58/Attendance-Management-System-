const express = require('express');
const router = express.Router();
const Admin = require('../../Model/Admin/adminSchema');
const bcrypt = require('bcrypt');
const db = require('../../db/conn');

// Email validation regular expression
const emailRegex = /^[a-zA-Z0-9]+@(yahoo|gmail)\.(com|net|org)$/i;

router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in the data" });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    let user = await Admin.findOne({ email: email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const token = await user.generateAuthToken();
      console.log(token);

      res.cookie('jwtoken', token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true
      });

      return res.json({ message: "Admin signed in successfully" });
    } else {
      user = new Admin({ email, password });
      await user.save();

      const token = await user.generateAuthToken();
      console.log(token);

      res.cookie('jwtoken', token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true
      });

      return res.status(201).json({ message: "Admin login successfully" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get('/admin/logout', (req, res) => {
  res.clearCookie('jwtoken',{path:'/'});
  res.json({ message: 'Logout successful' });
  res.status(200).send("User Logout")
});

module.exports = router;
