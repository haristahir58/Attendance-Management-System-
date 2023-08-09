const mongoose = require('mongoose');
const Users = require('../../Model/Users/userSchema')


const leaveRequestSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users', 
        required: true,
      },
      fromDate: {
        type: Date,
        required: true,
      },
      toDate: {
        type: Date,
        required: true,
      },
      reason: {
        type: String,
        required: true,
      },
  });
  
  const LeaveRequest = mongoose.model('LeaveRequest', leaveRequestSchema);
  
  module.exports = LeaveRequest;