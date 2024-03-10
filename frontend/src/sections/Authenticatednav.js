import React from 'react';
import '../styles/Authenticatednav.css';
import logo from '../images/EVS FOR ALL.png';
import {Link} from 'react-router-dom';

export default function Authenticatednavjs() {
  
    return (
        <div id = "menubar">
        <div id = "main_img">
            <Link to = "/" title = "EVs for All Website">
                <img src={logo} alt="EVs for All Website" />
            </Link>
        </div>
        <nav id = "homenav">
            <a className = "navlinks" href='/HomePage'>Home</a>
            <a className = "navlinks" href='/FindCars'>Find Cars</a>
            <a className = "navlinks"href='/HomePage'>Find EV Charging Stations</a>
            <a className = "navlinks"href='/HomePage'>More Information</a>
        </nav>
        </div>
    )
}
