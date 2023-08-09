const express = require('express');
const router = express.Router();
const Users = require('../../Model/Users/userSchema');
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const bcrypt = require('bcrypt');
const db = require('../../db/conn')
const authenticate = require("../../middleware/authenticate")


// Email validation regular expression
const emailRegex = /^[a-zA-Z0-9]+@(yahoo|gmail)\.(com|net|org)$/i;



router.post('/user/signup', upload.single('image'), async (req, res, next) => {
    console.log(req.file, req.body, 14)
  const { name, email, password, regNo, phoneNo } = req.body;
  const imageUrl = req.file.path;

  if (!name || !email || !password || !regNo || !phoneNo || !imageUrl) {
    return res.status(422).json({ error: "Please fill all the required fields" });
  }

  if (!emailRegex.test(email)) {
    return res.status(422).json({ error: "Invalid email address" });
  }

  try {
    const userExist = await Users.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already exists" });
    } else {
      const user = new Users({ name, email, password, regNo, phoneNo, imageUrl });
      await user.save();

        res.status(200).json({ success: true, message: "User registered successfully" });
    }
  } catch(err) { 
    console.log(err); 
}
});

router.post('/user/login', async (req, res) => {
  try {
    let token;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Please fill in the data" });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email address" });
    }

    const user = await Users.findOne({ email: email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      token = await user.generateAuthToken(); // Generate and save the token

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
        sameSite: "none", // Add this line
        secure: true, 
      });

      return res.json({ message: "Signin successful" });
    } else {
      return res.status(400).json({ error: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});


//Authenticate home page

router.get('/user/about', authenticate,(req,res)=>{
  res.send(req.rootUser)
})

//update profile picture

router.put('/user/about/:id', upload.single('image'), authenticate, async (req, res) => {
  try {
    const userId = req.params.id;
    const imageUrl = req.file ? req.file.path : undefined;
    const updatedData = {
      imageUrl: imageUrl, // Update the imageUrl field with the file information
    };

    const updatedPic = await Users.findByIdAndUpdate(userId, updatedData, { new: true });

    if (!updatedPic) {
      return res.status(404).json({ message: 'Picture not found' });
    }

    return res.json(updatedPic);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});


router.get('/user/logout', (req, res) => {
  res.clearCookie('jwtoken',{path:'/'});
  res.json({ message: 'Logout successful' });
  res.status(200).send("User Logout")
});




module.exports = router;
