import React from 'react';
import Menubar from '../sections/Menubar.js';
import NissanLeaf from '../images/nissanLeaf.jpg'; // Importing nissanLeaf.jpg

export default function Homepage() {
    return (
        <div>
            <Menubar />
            <div id="homeInfo">
                <div id="textinfo">
                    <h2 id="trustedCar">The Most Trusted Car Service in America</h2>
                    <h1 id="fastSearch">The Fast and Easy Way to <br/>Search for Your Car.</h1>
                    <p id="parainfo">
                        Experience the convenience of our car rental platform, meticulously crafted
                        for our car rental business owners. Our online system seamlessly redirects you
                        to the dealership of your choice, making your car rental process effortlessly
                        efficient. Already an EV owner? That's fine, locate charging stations near you
                        for quick and easy charging!
                    </p>
                </div>
                <img id="nissanLeaf" src={NissanLeaf} alt="The Future of EVs: Nissan Leaf"/> {/* Replaced Tesla image with 
                Nissan Leaf image */}
            </div>
        </div>
    )
}