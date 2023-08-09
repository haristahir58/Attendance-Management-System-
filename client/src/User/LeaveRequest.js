import React,{ useEffect, useState } from 'react'
import { useNavigate, Link, useParams } from "react-router-dom";
import "./Style/About.css";
import './Style/LeaveRequest.css'



const LeaveRequest = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [userData, setUserData] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [reason, setReason] = useState("");


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

  useEffect(() => {
    callHomePage();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const newFromDate = formData.get("fromDate");
    const newToDate = formData.get("toDate");
    const newReason = formData.get("reason");

    try {
      const res = await fetch("/user/send-leave-request", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fromDate: newFromDate, toDate: newToDate, reason: newReason }),
        credentials: "include",
      });

      const responseData = await res.json();
      console.log(responseData);

      if (res.status === 201) {
        window.alert("Leave Request Submission Successful");
        console.log("Leave Request Submission Successful");
        navigate("/user/home"); // Redirect to home page or other route
      } else {
        window.alert("Invalid Leave Request");
        console.log("Invalid Leave Request");
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
          <button className="buttonLink2" onClick={()=>navigate('/user/mark-attendence')}>Mark Attendance</button>
          <button className="buttonLink2" onClick={()=>navigate('/user/leave-request')}>Leave Request</button>
          <button className="buttonLink2" onClick={()=>navigate(`/user/view-attendence`)}>View Attendance</button>
        </div>
      </div>

    <div className="container1">
      <h1>Send Leave Request</h1>
      <form id="leave-request-form" onSubmit={handleFormSubmit}>
        <label htmlFor="leave-from-date">From Date:</label>
        <input
          type="date"
          id="leave-from-date"
          name="fromDate"
          required
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />

        <label htmlFor="leave-to-date">To Date:</label>
        <input
          type="date"
          id="leave-to-date"
          name="toDate"
          required
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />

        <label htmlFor="reason">Reason:</label>
        <textarea
          id="reason"
          rows="4"
          name="reason"
          required
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        ></textarea>

      <div className="btnContainer">

      <button className="btn2" type="submit">
              Submit Leave Request
            </button>
            </div>
      </form>
    </div>
    </>
  )
}

export default LeaveRequest