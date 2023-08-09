import React from 'react'
import { Link, NavLink } from "react-router-dom";
import '../Style/Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
    <ul className="navbar-nav">

    <li className="nav-item">
        <NavLink to={"/"} className="nav-link">
          Home
        </NavLink>
      </li>
      
    <li className="nav-item">
        <NavLink to={"/user/register"} className="nav-link">
          Register Student
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={"/user/login"} className="nav-link">
          Login Student
        </NavLink>
      </li>

      <li className="nav-item">
        <NavLink to={"/user/logout"} className="nav-link">
          Logout
        </NavLink>
      </li>
      <li className="nav-item">
        <NavLink to={"/admin/login"} className="nav-link">
          Login Admin
        </NavLink>
      </li>


    </ul>
  </nav>
  )
}

export default Navbar
