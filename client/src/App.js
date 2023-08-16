import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarHome from './Home/Components/Navbar';
import LoginAdmin from './Home/Components/LoginAdmin';
import Home from './Home/Components/Home';
import Register from './Home/Components/RegisterUser';
import LoginUser from './Home/Components/LoginUser';
import UserHome from './User/UserHome';
import About from './User/About';
import Logout from './Home/Components/Logout';
import ProfileUpdate from './User/ProfileUpdate';
import MarkAttendence from './User/MarkAttendence';
import LeaveRequest from './User/LeaveRequest';
import ViewAttendence from './User/ViewAttendence';
import AdminPanel from './Admin/AdminPanel';
import LogoutAdmin from './Home/Components/LogoutAdmin';
import UpdateAttend from './Admin/UpdateAttend';
import LeaveRecords from './Admin/LeaveRecords';


function App() {
  return (
    <Router>
      <div>
        <NavbarHome />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/user/login" element={<LoginUser />} />
          <Route exact path="/user/register" element={<Register />} />
          <Route exact path="/user/home" element={<UserHome/>} />
          <Route path="/user/home/:id" element={<ProfileUpdate />} />
          <Route exact path="/user/about" element={<About/>} />
          <Route exact path="/user/logout" element={<Logout/>} />
          <Route exact path="/user/mark-attendence" element={<MarkAttendence/>} />
          <Route exact path="/user/leave-request" element={<LeaveRequest/>} />
          <Route exact path="/user/view-attendence" element={<ViewAttendence/>} />
          
          

          <Route exact path="/admin/login" element={<LoginAdmin />} />
          <Route exact path="/admin/home" element={<AdminPanel/>} />
          <Route exact path="/admin/leaves" element={<LeaveRecords/>} />
          <Route exact path="/admin/attendances/:id" element={<UpdateAttend />} />
          <Route exact path="/admin/logout" element={<LogoutAdmin/>} />
  
        




        </Routes>
      </div>
    </Router>
  );
}

export default App;
