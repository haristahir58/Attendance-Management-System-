import React, { useState, useEffect } from 'react';

const LeaveRecords = () => {
  const [leaveRecords, setLeaveRecords] = useState([]);

  useEffect(() => {
    getLeaveRecords();
  }, []);

  const getLeaveRecords = async () => {
    try {
      const response = await fetch('/admin/leaves');
      const leaveData = await response.json();
      setLeaveRecords(leaveData);
    } catch (error) {
      console.error('Error fetching leave records:', error);
    }
  };

  const handleAccept = async (id) => {
    try {
      // Send a PUT request to accept the leave
      const response = await fetch(`/admin/leaves/${id}/accept`, {
        method: 'PUT',
      });

      if (response.status === 200) {
        window.alert('Leave Accepted');
        // You can refresh the leave records or update the state accordingly
        getLeaveRecords();
      } else {
        console.error('Error accepting leave');
      }
    } catch (error) {
      console.error('Error accepting leave:', error);
    }
  };

  const handleReject = async (id) => {
    try {
      // Send a PUT request to reject the leave
      const response = await fetch(`/admin/leaves/${id}/reject`, {
        method: 'PUT',
      });

      if (response.status === 200) {
        window.alert('Leave Rejected');
        // You can refresh the leave records or update the state accordingly
        getLeaveRecords();
      } else {
        console.error('Error rejecting leave');
      }
    } catch (error) {
      console.error('Error rejecting leave:', error);
    }
  };

  return (
    <div className="container">
      <h1>Leave Records</h1>
      <table>
        <tr>
          <th>Name</th>
          <th>Reg Number</th>
          <th>From Date</th>
          <th>To Date</th>
          <th>Number of Days</th>
          <th>Reason</th>
          <th>Action</th>
        </tr>
        {leaveRecords.map(leave => (
          <tr key={leave._id}>
            <td>{leave.userId.name}</td>
            <td>{leave.userId.regNo}</td>
            <td>{new Date(leave.fromDate).toLocaleDateString()}</td>
            <td>{new Date(leave.toDate).toLocaleDateString()}</td>
            <td>{(new Date(leave.toDate) - new Date(leave.fromDate)) / (1000 * 60 * 60 * 24)}</td>
            <td>{leave.reason}</td>
            <td>
              <button className="acceptBtn" onClick={() => handleAccept(leave._id)}>Accept</button>
              <button className="deleteBtn" onClick={() => handleReject(leave._id)}>Reject</button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
};

export default LeaveRecords;
