const express = require('express');
const router = express.Router();
const AdminAttendance = require('../../Model/Admin/AdminAttendance');
const Attendance = require('../../Model/Users/attendenceModel');
const LeaveRequest = require('../../Model/Users/leaveModel')
const Users = require('../../Model/Users/userSchema')
const authenticate = require("../../middleware/authenticate")

// Get all admin attendance records
// Get all attendance records
router.get('/admin/attendances', async (req, res) => {
  try {
    const attendances = await Attendance.find()
      .populate('userId', 'name regNo'); // Populate the 'userId' field with the 'name' field from the User collection

    if (!attendances || attendances.length === 0) {
      return res.status(404).json({ error: "No attendance records found" });
    }
    
    res.json(attendances);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get('/admin/leaves', async (req, res) => {
  try {
    const leave = await LeaveRequest.find()
      .populate('userId', 'name regNo'); // Populate the 'userId' field with the 'name' field from the User collection

    if (!leave || leave.length === 0) {
      return res.status(404).json({ error: "No Leaves records found" });
    }
    
    res.json(leave);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});





router.get('/admin/attendances/:id', async (req, res) => {
  try {
    const attendances = await Attendance.findOne({_id:req.params.id})
      .populate('userId', 'name regNo'); // Populate the 'userId' field with the 'name' field from the User collection

    if (!attendances || attendances.length === 0) {
      return res.status(404).json({ error: "No attendance records found" });
    }
    
    res.json(attendances);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an attendance record
router.put('/admin/attendances/:id', async (req, res) => {
  try {
    const attendanceId = req.params.id;
    const updatedAttendance = await Attendance.findByIdAndUpdate(attendanceId, req.body, { new: true });

    if (!updatedAttendance) {
      return res.status(404).json({ error: "Attendance record not found" });
    }

    res.json(updatedAttendance);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an attendance record
router.delete('/admin/attendances/:id', async (req, res) => {
  try {
    const attendanceId = req.params.id;
    const deletedAttendance = await Attendance.findOneAndDelete(attendanceId);

    if (!deletedAttendance) {
      return res.status(404).json({ error: "Attendance record not found" });
    }

    res.json({ message: "Attendance record deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Accept a leave request
router.put('/admin/leaves/:id/accept', async (req, res) => {
  try {
    const leaveId = req.params.id;
    // Update the leave request status to "Accepted"
    const updatedLeave = await LeaveRequest.findByIdAndUpdate(leaveId, { status: 'Accepted' }, { new: true });

    if (!updatedLeave) {
      return res.status(404).json({ error: "Leave request not found" });
    }

    // Here you can perform any additional actions if needed

    res.json({ message: "Leave request accepted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// Reject a leave request
router.put('/admin/leaves/:id/reject', async (req, res) => {
  try {
    const leaveId = req.params.id;
    // Update the leave request status to "Rejected"
    const updatedLeave = await LeaveRequest.findByIdAndUpdate(leaveId, { status: 'Rejected' }, { new: true });

    if (!updatedLeave) {
      return res.status(404).json({ error: "Leave request not found" });
    }

    // Here you can perform any additional actions if needed

    res.json({ message: "Leave request rejected successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



router.get('/admin/leave/accepted', async (req, res) => {
  try {
    // Find all accepted leave requests
    const acceptedLeaveRequests = await LeaveRequest.find({ status: 'Accepted' }).populate('userId', 'name regNo');

    const userIds = acceptedLeaveRequests.map(leave => leave.userId);

    // Fetch attendance records for the extracted user IDs
    const attendanceRecords = await Attendance.find({ userId: { $in: userIds } }).populate('userId', 'name regNo');

    res.json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/admin/leaves/rejected', async (req, res) => {
  try {
    // Find all rejected leave requests
    const rejectedLeaveRequests = await LeaveRequest.find({ status: 'Rejected' });

    // Extract user IDs from rejected leave requests
    const userIds = rejectedLeaveRequests.map(leave => leave.userId);

    // Fetch attendance records for the extracted user IDs
    const attendanceRecords = await Attendance.find({ userId: { $in: userIds } }).populate('userId', 'name regNo');

    res.json(attendanceRecords);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});






module.exports = router;
