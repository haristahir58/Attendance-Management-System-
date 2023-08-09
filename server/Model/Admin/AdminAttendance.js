const mongoose = require('mongoose');
const Users = require('../../Model/Users/userSchema'); 
const Attendance = require('../../Model/Users/attendenceModel'); 

const adminAttendanceSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference the User model
    required: true,
  },
  attendance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Attendance', // Reference the Attendance model
    required: true,
  },
});

const AdminAttendance = mongoose.model('AdminAttendance', adminAttendanceSchema);

module.exports = AdminAttendance;
