import React from 'react';
import Menubar from '../sections/Menubar.js';
import Tesla from '../images/tesla.jpeg';

export default function Homepage() {
    return (
        <div>
            <Menubar />
            <div id = "homeInfo">
                <div id = "textinfo">
                <h2 id="trustedCar">Welcome to EV's For All<br/>Driving Inclusivity in Electric Mobility</h2>
                    <h1 id = "fastSearch">The Fast and Easy Way to <br/>Search for Your Car.</h1>
                    <p id = "parainfo">
                        Experience the convenience of our car rental platform, meticulously crafted
                        for our car rental business owners. Our online system seamlessly redirects you
                        to the dealership of your choice, making your car rental process effortlessly
                        efficient. Already an EV owner? That's fine, locate charging stations near you
                        for quick and easy charging!
                    </p>
                </div>
                <img id = "tesla" src = {Tesla} alt = "The Future of EVs: Tesla"/>
            </div>
            
        </div>
    )
}