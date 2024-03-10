import React from 'react';
import '../styles/Navbar.css'; 
import logo from '../images/EVS FOR ALL.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <img src={logo} className="navbar-logo" alt="EV's FOR ALL Logo" /> 
      <div className="navbar-links">
        <a href="/">Home</a>
        <a href="/FindCars">Find Cars</a>
        <a href="/stations">Find EV Charging Stations</a>
        <a href="/info">More Information</a>
      </div>
    </nav>
  );
};

export default Navbar;
