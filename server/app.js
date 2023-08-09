const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const multer = require('multer');
const cookieparser = require('cookie-parser')
const app = express();

dotenv.config({ path: './config.env' });
require('./db/conn');

// Model
const Users = require('./Model/Users/userSchema');
const Admin = require('./Model/Admin/adminSchema')
const Attendance = require('./Model/Users/attendenceModel')
const AdminAttendance = require('./Model/Admin/AdminAttendance')

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieparser());
app.use('/uploads', express.static('uploads'));

//Routes
app.use(require('./Routes/Users/userRoutes'));
app.use(require('./Routes/Admin/adminRoutes'))
app.use(require('./Routes/Users/attendenceRoute'))
app.use(require('./Routes/Admin/adminAttendRoutes'))


// Verify JWT Token Middleware
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;

//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }

//   jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Invalid token' });
//     }
//     req.userId = decoded.userId; // Save the user ID from the token in the request object
//     next();
//   });
// };

// // Protected route to fetch user data
// app.get('/user/home', verifyToken, async (req, res) => {
//   try {
//     const user = await Users.findById(req.userId); // Fetch user data using the user ID from the token
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     // Return user data in the response
//     return res.json({ user: user });
//   } catch (err) {
//     console.error('Error fetching user data:', err);
//     res.status(500).json({ error: 'Internal Server Error' }); // Handle server errors gracefully
//   }
// });
// // Protected route to fetch user data
// app.get('/admin/home', verifyToken, async (req, res) => {
//   try {
//     const user = await Admin.findById(req.userId); // Fetch user data using the user ID from the token
//     if (!user) {
//       return res.status(404).json({ message: 'Admin not found' });
//     }
//     // Return user data in the response
//     return res.json({ user: user });
//   } catch (err) {
//     console.error('Error fetching user data:', err);
//     res.status(500).json({ error: 'Internal Server Error' }); // Handle server errors gracefully
//   }
// });

const PORT = 5000; 
app.listen(PORT, () => {
  console.log(`Server is running at Port No ${PORT}`);
});
