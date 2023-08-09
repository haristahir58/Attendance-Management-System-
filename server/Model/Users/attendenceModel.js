const mongoose = require('mongoose');
const Users = require('../../Model/Users/userSchema')

const attendanceSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users', // Reference to the User model
    required: true,
  },
  date: {
    type: Date,
    default: Date.now, // Automatically sets the current date
    required: true,
  },
  attendanceStatus: {
    type: String,
    enum: ['Present', 'Absent'],
    required: true,
  },
});

attendanceSchema.index({ userId: 1, date: 1 }, { unique: true }); // Index to ensure unique attendance per user per date

const Attendance = mongoose.model('Attendance', attendanceSchema);

module.exports = Attendance;
