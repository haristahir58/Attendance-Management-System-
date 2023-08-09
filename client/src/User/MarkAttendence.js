import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Style/About.css";
import "./Style/MarkAttendence.css";

const MarkAttendence = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState("Absent"); // Default value
  const [attendanceMarked, setAttendanceMarked] = useState(false); // Add this state
  
  const params = useParams()


  const callHomePage = async () => {
    try {
      const res = await fetch("/user/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
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
      navigate("/user/login");
    }
  };

  const checkAttendanceMarked = async () => {
    try {
      const res = await fetch("/user/mark-attendance", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();
      setAttendanceMarked(data.attendanceMarked);

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
    checkAttendanceMarked();
  }, []); // Add callHomePage to the dependency array

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    await checkAttendanceMarked();

    if (attendanceMarked) {
      window.alert("Attendance already marked for today");
      return;
    }
  
    try {
      const res = await fetch("/user/mark-attendance", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ attendanceStatus }),
        credentials: "include",
      });

      const responseData = await res.json();
      console.log(responseData);

      if (res.status === 201) {
        window.alert("Attendance Submission Successful");
        console.log("Attendance Submission Successful");
        navigate("/user/home");
      } else {
        window.alert(`Your Attendence is already marked come torrow ${userData.name} please!!`);
        console.log("Invalid Attendance");
      }
    } catch (error) {
      console.error(error);
    }
  };
  

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
            onClick={() => navigate("/user/mark-attendance")}
          >
            Mark Attendance
          </button>
          <button
            className="buttonLink2"
            onClick={() => navigate("/user/leave-request")}
          >
            Leave Request
          </button>
          <button
            className="buttonLink2"
            onClick={() => navigate(`/user/view-attendance`)}
          >
            View Attendance
          </button>
        </div>
      </div>
      <div className="container">
        <h1>Mark Attendance</h1>
        <form id="attendance-form" onSubmit={handleFormSubmit}>
          <label htmlFor="name">Student Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={userData ? userData.name : ""}
          />

          <label htmlFor="regNo">Registration Number:</label>
          <input
            type="text"
            id="regNo"
            name="regNo"
            required
            value={userData ? userData.regNo : ""}
          />

          <label htmlFor="attendance-status">Attendance Status:</label>
          <select
            id="attendance-status"
            name="attendanceStatus"
            required
            value={attendanceStatus}
            onChange={(e) => setAttendanceStatus(e.target.value)}
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>

          <div className="btnContainer">
          {attendanceMarked ? (
            <p>Attendance already marked for today</p>
          ) : (
            <button className="btn1" type="submit">
              Submit
            </button>
          )}
          </div>
        </form>
      </div>
    </>
  );
};

export default MarkAttendence;
