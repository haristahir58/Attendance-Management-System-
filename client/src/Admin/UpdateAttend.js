import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';

const UpdateAttend = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [attendanceStatus, setAttendanceStatus] = useState('');

  useEffect(() => {
    console.log('Fetching attendance record...');
    getAttendance();
  }, []);
  
  const getAttendance = async () => {
    try {
      const response = await fetch(`/admin/attendances/${params.id}`);
      console.log('Attendance response:', response); // Check the response
      const attendanceData = await response.json();
      console.log('Attendance data:', attendanceData); // Check the data
      setAttendanceStatus(attendanceData.attendanceStatus);
    } catch (error) {
      console.error('Error fetching attendance record:', error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/admin/attendances/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attendanceStatus }),
      });
      const data = await response.json();

      if (response.status === 422 || !data) {
        window.alert("Invalid Attendence");
        console.log("Invalid Attendence");
      } else {
        window.alert("Attendence Updation Successful");
        console.log("Attendence Updation Successful");
        navigate("/admin/home");
      }
    } catch (error) {
      console.error('Error updating attendance status:', error);
    }
  };

  return (
    <div className="container">
      <h1>Update Attendance Status</h1>
      <form id="update-attendance-form" onSubmit={handleUpdate}>
        <label htmlFor="attendance-status">Attendance Status:</label>
        <select
          id="attendance-status"
          name="attendanceStatus"
          value={attendanceStatus}
          onChange={(e) => setAttendanceStatus(e.target.value)}
          required
        >
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdateAttend;
