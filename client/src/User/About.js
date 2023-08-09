import React, { useEffect, useState } from 'react';
import profPic from '../images/profile-pic.png';
import { useNavigate } from 'react-router-dom';
import './Style/About.css'

const About = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null); // Initialize userData as null

  const callAboutPage = async () => {
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
        // Check for the response's 'ok' property to handle error status
        const error = new Error(res.statusText);
        throw error;
      }
    } catch (err) {
      console.log(err);
      navigate('/user/login');
    }
  };

  useEffect(() => {
    callAboutPage();
  }, []);

  return (
    <>
      <div className="container emp-profile">
        {userData && (
          <form method="GET">
            <div className="row">
              <div className="col-md-4">
              <img src={`http://localhost:5000/${userData.imageUrl}`} />
              </div>

              <div className="col-md-6">
                <div className="profile-head">
                  <h5>{userData.name}</h5>
                  <h6>{userData.regNo}</h6>

                  <ul className="nav nav-tabs" role="tablist">
                    <li className="nav-item">
                      <a className="nav-link active" id="home-tab" data-toggle="tab" href="#" role="tab">
                        About
                      </a>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="col-md-2">
                <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
              </div>
            </div>

            <div className="row">
              <div className="col-md-8 pl-5 about-info">
                <div className="tab-content profile-tab" id="myTabContent">
                  <div className="tab-pane fade show active" id="home" role="tabpanel" area-aria-labelledby="home-tab">
                    <div className="row">
                      <div className="col-md-6">
                        <label>User ID</label>
                      </div>
                      <div className="col-md-6">
                        <p>{userData._id}</p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <label>Name</label>
                      </div>
                      <div className="col-md-6">
                        <p>{userData.name}</p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <label>Email</label>
                      </div>
                      <div className="col-md-6">
                        <p>{userData.email}</p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <label>Registration Number</label>
                      </div>
                      <div className="col-md-6">
                        <p>{userData.regNo}</p>
                      </div>
                    </div>

                    <div className="row">
                      <div className="col-md-6">
                        <label>Phone Number</label>
                      </div>
                      <div className="col-md-6">
                        <p>{userData.phoneNo}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default About;
