import React from 'react';
import logo from '../images/EVS FOR ALL.png';
import {Link, NavLink} from 'react-router-dom';

export default function Menubar() {
    return (
        <div id = "menubar">
            <Link to = "/" title = "EVs for All Website">
                <img src={logo} alt="EVs for All Website" />
            </Link>
            <nav id = "homenav">
                <a className = "navlinks" href='/'>Home</a>
                <a className = "navlinks" href='/FindCars'>Find Cars</a>
                <a className = "navlinks" href='/stations'>Find EV Charging Stations</a>
                <a className = "navlinks">More Information</a>
            </nav>
        </div>
    )
}