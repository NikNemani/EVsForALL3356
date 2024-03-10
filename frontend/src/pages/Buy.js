import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useUser } from '../functions/userContext';
import '../styles/Buy.css';
import Authenticatednavjs from '../sections/Authenticatednav.js';
import Search from '../sections/LocationSearchBar.js';
import '../styles/Car.css';
import Dropdown from '../sections/SortMenu.js';
import Filter from '../sections/FilterMenu.js';
import Randomizer from '../functions/Randomizer.js';

function Car({ id, name, price, image, mpg, capacity, onStar, onUnstar }) {
  const [starred, setStarred] = useState(null); // State to store the fetched data

  // Async function to fetch data
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8800/is-starred', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ vehicle_id: id })
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const starred = await response.json(); // Assuming the response is JSON
      setStarred(starred); // Update the state with the fetched data
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]); // Dependency array includes id to refetch if the car's id changes

  const toggleStar = useCallback(() => {
    if (starred) {
      onUnstar();
    } else {
      onStar();
    }
    setStarred(!starred);
  }, [starred, onStar, onUnstar]);

  return (
    <div className="car" id={`car-${id}`}>
      <img src={image} alt={`${name}`} />
      <h2>{name}</h2>
      <div>MPGe: {mpg}</div>
      <div>Capacity: {capacity} People</div>
      <div className="price">${price}</div>
      <button onClick={toggleStar} className={`star ${starred ? 'starred' : ''}`}>
        {starred ? '★' : '☆'}
      </button>
      <button className="buy-now">See Available Locations</button>
    </div>
  );
}

const Buy = () => {
  const { user: currentUser } = useUser();
  const [cars, setCars] = useState([]);
  const [changer, setChanger] = useState("Default (Sort by)");
  const [filter, setFilter] = useState({
    min: 0,
    max: 140000,
    audi: undefined,
    bmw: undefined,
    tesla: undefined,
    year: undefined
  });

  const fetchCars = useCallback(async () => {
    try {
      const response = await fetch('http://localhost:8800/light-duty-automobiles');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  }, []);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

  const handleStar = async (vehicleId, price) => {
    // Implementation for starring a vehicle
  };

  const handleUnstar = async (vehicleId) => {
    // Implementation for unstarring a vehicle
  };

  return (
    <div>
      <Authenticatednavjs />
      <div className="flexbox">
        <Search />
        <Dropdown
          items={sortMenuItems}
          dropdown="dropdown-content"
          buttonClass="dropbtn"
          buttonTrigger={changer}
          changer={setChanger}
        />
        <Filter
          dropdown="dropdown-content"
          buttonClass="dropbtn"
          buttonTrigger="Default (Filter by)"
          handleChange={handleFilterChange}
          handleSubmit={handleSubmit}
          filter={filter}
        />
      </div>

      <div className="buy-page">
        {cars.filter(car => car.manufacturer_name != null && car.model != null && car.model_year != null && car.photo_url !== "" && car.electric_range !== "" && car.fuel_name != null && car.drivetrain != null && car.seating_capacity !== "").map((car, index) => {
          if (randomPrices[index] <= filter.max && randomPrices[index] >= filter.min) {
            return (
              <Car
                key={car.id}
                id={car.id}
                name={`${car.manufacturer_name} ${car.model}`}
                price={randomPrices[index]}
                image={car.photo_url}
                mpg={car.electric_range}
                capacity={car.seating_capacity}
                onStar={() => handleStar(car.id, randomPrices[index])}
                onUnstar={() => handleUnstar(car.id)}
              />
            );
          } else {
            return null;
          }
        })}
      </div>
    </div>
  );
};

export default Buy;
