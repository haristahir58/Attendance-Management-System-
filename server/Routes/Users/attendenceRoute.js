const express = require('express');
const router = express.Router();
const Attendance = require('../../Model/Users/attendenceModel');
const LeaveRequest = require('../../Model/Users/leaveModel')
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })
const bcrypt = require('bcrypt');
const db = require('../../db/conn')
const authenticate = require("../../middleware/authenticate")


router.post('/user/mark-attendance', authenticate, async (req, res) => {
  try {
    const { attendanceStatus } = req.body;
    const userId = req.userId; // Extracted from authentication middleware
    const currentDate = new Date().setHours(0, 0, 0, 0); // Set time to midnight

    if (!attendanceStatus) {
      return res.status(422).json({ message: "Please select Attendance Status" });
    }

    // Check if an attendance record already exists for the current date and user
    const existingAttendance = await Attendance.findOne({ userId, date: { $gte: currentDate } });

    if (existingAttendance) {
      return res.status(400).json({ message: 'Attendance already marked for today', attendanceMarked: true });
    }

    const attendance = new Attendance({
      userId,
      date: new Date(), // Automatically generates the current date
      attendanceStatus,
    });

    await attendance.save();

    res.status(201).json({ message: 'Attendance marked successfully', attendanceMarked: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});








router.get('/user/view-attendence', authenticate, async (req, res) => {

    try {
      const userId = req.userId; // Extracted from authentication middleware
      const attend = await Attendance.find({ userId }); // Create a query object
      if (!attend) {
        return res.status(404).json({ error: "Can't find Attendances" });
      }
      res.json(attend);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });



  // Leave Request

  router.post('/user/send-leave-request', authenticate, async (req, res) => {
    try {
      const { fromDate, toDate, reason } = req.body;
      const userId = req.userId;
  
      const leaveRequest = new LeaveRequest({
        userId,
        fromDate,
        toDate,
        reason,
      });
  
      await leaveRequest.save();
  
      res.status(201).json({ message: 'Leave request submitted successfully' });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  

module.exports = router;
