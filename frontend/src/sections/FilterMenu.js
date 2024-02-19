import React, { useState, useEffect } from 'react';
import '../styles/FilterMenu.css'

export default function Dropdown(props) {
    const [activate, setActivate] = useState(false);

    useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest('.dropdown') && activate) {
                setActivate(false);
            }
        }
        window.addEventListener('click', handleClickOutside);
        return () => {
            window.removeEventListener('click', handleClickOutside);
        };
    }, [activate]);

    function dropActivate() {
        setActivate(prevActivate => !prevActivate);
    }

    return (
        <div className="dropdown">
            <button onClick={dropActivate} className={`${activate ? `${props.buttonClass} white` : props.buttonClass}`}>
                {props.buttonTrigger}
            </button>
            <form onSubmit={props.handleSubmit} className={`${activate ? 'dropdown-content' : 'inactive'}`}>
                <h3>Price</h3>
                <div className = "priceFlex">
                    <input
                        type="number"
                        placeholder='min price'
                        className = "filterInput"
                        name='min'
                        value={props.filter.min}
                        onChange={props.handleChange}
                    />
                    <p className = "filterpara">to</p>
                    <input
                        type="number"
                        placeholder='max price'
                        className = "filterInput"
                        name='max'
                        value={props.filter.max}
                        onChange={props.handleChange}
                    />
                </div>
                <h3 className = "divMarg">Make</h3>
                <div className = "flexboxx">
                    <div className = "priceFlex">
                        <input
                            type="checkbox"
                            id="Audi"
                            className = "filterInput marginRight5"
                            name='audi'
                            value={props.filter.audi}
                            onChange={props.handleChange}
                        />
                        <label htmlFor='Audi'>Audi</label>
                    </div>
                    <div className = "priceFlex">
                        <input
                            type="checkbox"
                            id="BMW"
                            className = "filterInput marginRight5"
                            name='bmw'
                            value={props.filter.bmw}
                            onChange={props.handleChange}
                        />
                        <label htmlFor='BMW'>BMW</label>
                    </div>
                    <div className = "priceFlex">
                        <input
                            type="checkbox"
                            id="Tesla"
                            className = "filterInput marginRight5"
                            name='tesla'
                            value={props.filter.tesla}
                            onChange={props.handleChange}
                        />
                        <label htmlFor='Tesla'>Tesla</label>
                    </div>
                </div>
                <h3 className = "divMarg">Year</h3>
                <div className = "flexboxx">
                    <div className = "priceFlex">
                        <input
                            type="checkbox"
                            id="2020"
                            className = "filterInput marginRight5"
                        />
                        <label htmlFor='2020'>2020</label>
                    </div>
                    <div className = "priceFlex">
                        <input
                            type="checkbox"
                            id="2021"
                            className = "filterInput marginRight5"
                        />
                        <label htmlFor='2021'>2021</label>
                    </div>
                    <div className = "priceFlex">
                        <input
                            type="checkbox"
                            id="2022"
                            className = "filterInput marginRight5"
                        />
                        <label htmlFor='2022'>2022</label>
                    </div>
                    <div className = "priceFlex">
                        <input
                            type="checkbox"
                            id="2023"
                            className = "filterInput marginRight5"
                        />
                        <label htmlFor='2023'>2023</label>
                    </div>
                </div>
            </form>
        </div>
    );
}
