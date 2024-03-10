import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, StandaloneSearchBox } from '@react-google-maps/api';
import Menubar from '../sections/Menubar.js';

const mapContainerStyle = {
  height: '600px',
  width: '100%',
};

const center = {
  lat: -34.397,
  lng: 150.644,
};

const libraries = ['places'];

const MapComponent = ({ title }) => {
  const [mapCenter, setMapCenter] = useState(center);
  //stores charging station pins to be displayed automatically
  const [chargingStations, setChargingStations] = useState([]);
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

  const fetchEVChargingStations = (map, center) => {
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      location: center,
      radius: '5000',
      type: ['charging_station'],
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

  return (
    <div>
      <Menubar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <h2>{title}</h2>
        <LoadScript googleMapsApiKey="INSERT_API_KEY_HERE" libraries={libraries}>
        <div style={{ marginBottom: '20px', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <StandaloneSearchBox onLoad={onLoad} onPlacesChanged={onPlacesChanged}>
                <input
                type="text"
                placeholder="Search for places..."
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
            <button onClick={locate} style={{
                boxSizing: 'border-box',
                border: '1px solid #ccc',
                backgroundColor: '#fff',
                width: 'fit-content',
                height: '40px',
                padding: '8px 12px',
                borderRadius: '5px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
                fontSize: '16px',
                cursor: 'pointer',
            }}>
                Locate Me
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
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
};

export default MapComponent;