const express = require('express');
const router = express.Router();
const AdminAttendance = require('../../Model/Admin/AdminAttendance');

// Get all admin attendance records
router.get('/admin/attendance', async (req, res) => {
  try {
    const adminAttendances = await AdminAttendance.find()
      .populate('student')
      .populate('attendance');
      
    res.render('adminAttendance', { adminAttendances }); // Update the template name as needed
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit admin attendance record
router.get('/admin/attendance/:id/edit', async (req, res) => {
  try {
    const adminAttendance = await AdminAttendance.findById(req.params.id)
      .populate('student')
      .populate('attendance');
      
    res.render('editAdminAttendance', { adminAttendance }); // Update the template name as needed
  } catch (err) {
    res.status(404).json({ message: 'Attendance record not found' });
  }
});

// Update admin attendance record
router.put('/admin/attendance/:id', async (req, res) => {
  try {
    await AdminAttendance.findByIdAndUpdate(req.params.id, req.body);
    res.redirect('/admin/attendance');
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete admin attendance record
router.delete('/admin/attendance/:id', async (req, res) => {
  try {
    await AdminAttendance.findByIdAndDelete(req.params.id);
    res.redirect('/admin/attendance');
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
