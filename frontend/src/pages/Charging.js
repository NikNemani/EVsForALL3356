import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox, InfoWindow } from '@react-google-maps/api';
import Menubar from '../sections/Menubar.js';
import Footer from '../sections/Footer.js';

//could change this display in the future
const mapContainerStyle = {
  height: '600px',
  width: '85%',
};

// This part is currently set to Atlanta as the default location for the 
// Google Maps API
const center = {
  lat: 33.7488,
  lng: -84.3877,
};

const libraries = ['places'];

const MapComponent = ({ title }) => {
  const [mapCenter, setMapCenter] = useState(center);
  //stores charging station pins to be displayed automatically
  const [chargingStations, setChargingStations] = useState([]);
  const [hoveredMarker, setHoveredMarker] = useState(null);
  const searchBoxRef = useRef(null);
  const mapRef = useRef(null);

  const onLoad = (ref) => {
    searchBoxRef.current = ref;
  };

  const onMapLoad = (map) => {
    mapRef.current = map;
    fetchEVChargingStations(map, center);
  };

  const onPlacesChanged = () => {
    const places = searchBoxRef.current.getPlaces();
    if (places && places.length > 0) {
      const location = places[0].geometry.location;
      const newCenter = { lat: location.lat(), lng: location.lng() };
      setMapCenter(newCenter);
      fetchEVChargingStations(mapRef.current, newCenter);
    }
  };

  //fetches EV stations and traditional charging stations, will filter it to display only EV stations in the future
  const fetchEVChargingStations = (map, center) => {
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: center,
      radius: '5000',
      type: ['electric_vehicle_charging_station'],
    };

    service.nearbySearch(request, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        setChargingStations(results);
      }
    });
  };

  const locate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const currentLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMapCenter(currentLocation);
        mapRef.current.panTo(currentLocation);
        // Adjust zoom level
        mapRef.current.setZoom(15);
      }, () => {
        console.error("Geolocation is not supported by this browser or access denied.");
      });
    }
  };

  useEffect(() => {
    if (mapRef.current && mapCenter) {
      fetchEVChargingStations(mapRef.current, mapCenter);
    }
  }, [mapCenter]);

  console.log(process.env.MAPS_API_KEY + "hello")

  return (
    <div>
      <Menubar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <h2>{title}</h2>
        {/* Please do not change the following line. Use this command $env:REACT_APP_GOOGLE_MAPS_API_KEY = "your_api_key_here"; npm start
when doing npm start to use API KEY, this way noboby accidently pushes the key into our repo. Note if command doesn't work on windows use the Set command instead. If you have a mac both these command won't work. Look online for the appropiate bash and zsh command that is equivalent */}
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} libraries={libraries}>
        <div style={{ marginBottom: '20px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
                <input
                type="text"
                placeholder="Enter your location..."
                style={{
                    boxSizing: 'border-box',
                    border: '1px solid #ccc',
                    width: '300px',
                    height: '40px',
                    padding: '0 12px',
                    borderRadius: '5px',
                    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                    fontSize: '16px',
                    outline: 'none',
                    textOverflow: 'ellipses',
                    marginRight: '10px',
                }}
                />
            </StandaloneSearchBox>
            <button 
  onClick={locate} 
  style={{
    boxSizing: 'border-box',
    border: '1px solid #ccc',
    backgroundColor: '#fff',
    width: 'fit-content', // Adjust width dynamically
    minWidth: '120px', // Minimum width to prevent too narrow button
    height: '40px',
    padding: '8px 12px',
    borderRadius: '5px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
    fontSize: '16px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '@media (max-width: 600px)': { /* Adjust the width based on your preference */
      width: '100%', /* Set width to 100% on smaller screens */
    }
  }}>
  Use my location
  </button>
            </div>

          <GoogleMap mapContainerStyle={mapContainerStyle} center={mapCenter} zoom={10} onLoad={onMapLoad}>
            {chargingStations.map(station => (
              <Marker
                key={station.place_id}
                position={{
                  lat: station.geometry.location.lat(),
                  lng: station.geometry.location.lng(),
                }}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                }}
                onMouseOver={() => setHoveredMarker(station)}
              />
            ))}
                  {hoveredMarker && (
        <InfoWindow
          position={{
            lat: hoveredMarker.geometry.location.lat(),
            lng: hoveredMarker.geometry.location.lng(),
          }}
          onCloseClick={() => setHoveredMarker(null)}
        >
          <div>
            <h3>{hoveredMarker.name}</h3>
            <p>{hoveredMarker.vicinity}</p>
            <p>Rating: {hoveredMarker.rating}</p>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${hoveredMarker.geometry.location.lat()},${hoveredMarker.geometry.location.lng()}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Directions
            </a>
          </div>
        </InfoWindow>
      )}
          </GoogleMap>
        </LoadScript>
      </div>
      <Footer />
    </div>
  );
};

export default MapComponent;
