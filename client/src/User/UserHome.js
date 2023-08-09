import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Style/About.css";
import { useParams } from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [image, setImage] = useState("");
  const params = useParams();

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
  }, []); // Add callHomePage as a dependency

//   const handleEditProfileClick = async (e) => {
//   e.preventDefault();

//   const formData = new FormData();
//   formData.append("image", image);

//   try {
//     const res = await fetch(`/user/about/${params.id}`, {
//       method: "PUT",
//       body: formData,
//     });

//     const data = await res.json();
//     if (res.status === 422 || !data) {
//       window.alert("Invalid File Type");
//       console.log("Invalid File Type");
//     } else {
//       window.alert("Picture Updation Successful");
//       console.log("Picture Updation Successful");
//       navigate("/user/home");
//     }
//   } catch (err) {
//     console.log(err);
//     // Handle error (e.g., show an error message to the user)
//   }
// };
  

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
      
      <div className="container emp-profile">
        <form method="GET">
          <div className="row">
            <div className="col-md-4">
              <img
                src={
                  image
                    ? URL.createObjectURL(image)
                    : `http://localhost:5000/${userData && userData.imageUrl}`
                }
                alt="User Profile"
              />

            </div>

            <div className="col-md-2">
        <Link to={`/user/home/${userData && userData._id}`} className="buttonLink">
          Edit Profile Picture
        </Link>
      </div>

            <div className="col-md-6">
              <div className="profile-head">
                <h5>{userData && userData.name}</h5>
                <h6>{userData && userData.regNo}</h6>

                <ul className="nav nav-tabs" role="tablist">
                  <li className="nav-item">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#"
                      role="tab"
                    >
                      About
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-8 pl-5 about-info">
              <div className="tab-content profile-tab" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="home"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>User ID</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData && userData._id}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Name</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData && userData.name}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Email</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData && userData.email}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Registration Number</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData && userData.regNo}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label>Phone Number</label>
                    </div>
                    <div className="col-md-6">
                      <p>{userData && userData.phoneNo}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default UserHome;
