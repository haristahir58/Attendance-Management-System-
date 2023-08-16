const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
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
adminSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

// Generate JWT token
adminSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign({ userId: this._id }, process.env.SECRET_KEY);
    return token;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const Admin = mongoose.model('admin', adminSchema);
module.exports = Admin;
