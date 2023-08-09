import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Style/ViewAttendence.css'


const ViewAttendence = () => {
  const navigate = useNavigate();
  
  const [userData, setUserData] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]); // Updated state for attendance data


  const callHomePage = async () => {
    try {
      const res = await fetch('/user/about', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();
      console.log(data);
      setUserData(data);

      if (!res.ok) {
        const error = new Error(res.statusText);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate('/user/login');
    }
  };

  const fetchAttendanceData = async () => {
    try {
      const res = await fetch(`/user/view-attendence`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      const data = await res.json();
      console.log(data);
      setAttendanceData(data);

      if (!res.ok) {
        const error = new Error(res.statusText);
        throw error;
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callHomePage();
    if (userData) {
      fetchAttendanceData();
    }
  }, [userData]);

  return (
    <>
      <div className="home-page">
        <div className="home-div">
          <p className="pt-5">WELCOME {userData && userData.name}</p>
          <h3>{userData && userData.regNo}</h3>
        </div>
        <div className="buttons-container">
        <button className="buttonLink2" onClick={()=>navigate('/user/home')}>View Profile</button>
          <button
            className="buttonLink2"
            onClick={() => navigate('/user/mark-attendence')}
          >
            Mark Attendance
          </button>
          <button
            className="buttonLink2"
            onClick={() => navigate('/user/leave-request')}
          >
            Leave Request
          </button>
          <button
            className="buttonLink2"
            onClick={() => navigate(`/user/view-attendence`)}
          >
            View Attendance
          </button>
        </div>
      </div>
      <div className="container">
        <h1>View Attendance</h1>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Attendance Status</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((entry) => (
              <tr key={entry._id}>
                <td>{new Date(entry.date).toLocaleDateString()}</td>
                <td>{entry.attendanceStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ViewAttendence;