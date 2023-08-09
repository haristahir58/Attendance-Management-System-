const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  regNo: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  tokens:[
    {
      token:{
        type: String,
        required: true
      }
    }
  ]
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Generate JWT token
userSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const Users = mongoose.model('users', userSchema);
module.exports = Users;
