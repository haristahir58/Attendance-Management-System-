import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './Style/AdminPanel.css'

const AdminPanel = () => {
  const navigate = useNavigate();

  const [attendances, setAttendances] = useState([]);
 
  useEffect(() => {
    getAttendance();

  }, []);

  const getAttendance = async () => {
    let attend = await fetch('/admin/attendances');
    attend = await attend.json();
    setAttendances(attend);
  };

  const handleDelete = async (id) => {
    let attend = await fetch(`/admin/attendances/${id}`, {
      method: 'Delete',
    });

    if (attend.status === 200) {
      window.alert('Attendance is Deleted');
      navigate('/admin/home');
    } else {
      console.log('Error deleting Attendance');
    }
  };

  
  return (
    <>
    <div className="container5">
      <h1 className="heading">Admin Panel</h1>
      <table className='tableAdmin'>
        <tr>
          <th>Student Name</th>
          <th>Registration Number</th>
          <th>Date Marked</th>
          <th>Attendance Status</th>
          <th>Action</th>
        </tr>
        {attendances.map(attendance => (
          <tr key={attendance._id}>
            <td>{attendance.userId.name}</td>
            <td>{attendance.userId.regNo}</td>
            <td>{attendance.date}</td>
            <td>{attendance.attendanceStatus}</td>
            <td>
              <Link to={`/admin/attendances/${attendance._id}`} className="linkBtn">
                Update
              </Link>
              <button className="deleteBtn" onClick={() => handleDelete(attendance._id)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </table>
      <Link to="/admin/leaves" className="addBtn">
        View Student Leaves
      </Link>
    </div>

    </>
  );
};

export default AdminPanel;