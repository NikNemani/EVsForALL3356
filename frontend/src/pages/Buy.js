import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useUser } from '../functions/userContext';
import '../styles/Buy.css';
import Authenticatednavjs from '../sections/Authenticatednav.js';
import Search from '../sections/LocationSearchBar.js'
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

  // useEffect to call fetchData on component mount
  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this runs once on mount
  JSON.stringify(starred)

  console.log('starred :' + starred);

  const toggleStar = () => {
    if (starred) {
      onUnstar();  // Call the function to unstar the car
    } else {
      onStar();    // Call the function to star the car
    }

    setStarred(!starred);
  };

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

  //------

  // State to store fetched cars
  const [cars, setCars] = useState([]);

  //cars variable format: an array of car objects:

  // [
  //   {
  //     "id": 1,
  //     "manufacturer_name": "Tesla",
  //     "model": "Model S",
  //     "model_year": 2022,
  //     "photo_url": "https://example.com/tesla-model-s.jpg",
  //     "electric_range": 390,
  //     "fuel_name": "Electric",
  //     "drivetrain": "AWD",
  //     "seating_capacity": 5
  //   },
  //   {
  //     "id": 2,
  //     "manufacturer_name": "Chevrolet",
  //     "model": "Bolt EV",
  //     "model_year": 2021,
  //     "photo_url": "https://example.com/chevrolet-bolt.jpg",
  //     "electric_range": 259,
  //     "fuel_name": "Electric",
  //     "drivetrain": "FWD",
  //     "seating_capacity": 5
  //   },
  //   //car objects...
  // ]

  // Function to fetch cars from backend
  const fetchCars = async () => {
    try {
      const response = await fetch('http://localhost:8800/light-duty-automobiles');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      console.log(data)
      // Assuming the backend returns an array of cars
      setCars(data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  // useEffect to call fetchCars on component mount
  useEffect(() => {
    fetchCars();
  }, []);




  const handleStar = async (currentUser, vehicleId, price) => {
    console.log('price :' + price);
    await fetch('http://localhost:8800/star-vehicle', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ username: currentUser, vehicle_id: vehicleId, price: price })
    }).then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    }).then(data => {
      console.log(data);
    }).catch(error => {
      console.error('Fetch error:', error);
    });
    // fetchStarredVehicles();
  };

  const handleUnstar = async (currentUser, vehicleId) => {
    await fetch('http://localhost:8800/unstar-vehicle', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ username: currentUser, vehicle_id: vehicleId })
    });
    //  fetchStarredVehicles();
  };

  const sortMenuItems = [
    { title: 'Default (Sort by)' },
    { title: 'Price (lowest to highest)' },
    { title: 'Price (highest to lowest)' },
    { title: 'Alphabetically (A-Z)' }
  ];

  const [changer, setChanger] = useState("Default (Sort by)")
  const [filter, setFilter] = useState({
    min: 0,
    max: 140000,
    audi: undefined,
    bmw: undefined,
    tesla: undefined,
    year: undefined
  })

  function handleFilterChange(e) {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
  
    setFilter(prev => ({
      ...prev,
      [name]: newValue
    }));
    console.log(filter);
  }  

  function handleSubmit(e) {
    e.preventDefault();
  }
  
  const randomPrices = useMemo(() => {
    const prices = [];
    for (let i = 0; i < cars.length; i++) {
      prices.push(Randomizer({ base_num: 40000, range: 100000 }));
    }
    return prices;
  }, [cars]); // Recalculate prices whenever cars change

  return (
    <div>
      <Authenticatednavjs />
      <div className="flexbox">
        <Search />
        <div>
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
            filter = {filter}
          />
        </div>
      </div>

      <div className="buy-page">
        {/* Filters out cars with missing values */}
        {cars.filter(car =>
          car.manufacturer_name != null &&
          car.model != null &&
          car.model_year != null &&
          car.photo_url != "" &&
          car.electric_range != "" &&
          car.fuel_name != null &&
          car.drivetrain != null &&
          car.seating_capacity != ""
        ).map((car, index) => {
          if (randomPrices[index] <= filter.max && randomPrices[index] >= filter.min) {
            return (
              <Car
                key={car.id}
                id={car.id}
                name={car.manufacturer_name + " " + car.model}
                // Random price for every car as we don't have car prices just yet
                price={randomPrices[index]}
                image={car.photo_url}
                mpg={car.electric_range}
                capacity={car.seating_capacity}
                onStar={() => handleStar(currentUser, car.id, car.price)}
                onUnstar={() => handleUnstar(currentUser, car.id)}
              />
            );
          }
          else {
            return null
          }
        })}
      </div>
    </div>
  );
};

export default Buy;
