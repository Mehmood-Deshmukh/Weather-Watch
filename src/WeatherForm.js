import React, { useState } from 'react';

const WeatherForm = ({ getWeather, getCurrentLocation }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(location);
  };

  const handleCurrSubmit = () =>{
    getCurrentLocation();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
      />
      <button type="submit">Get Weather</button>
      <button type="button" onClick={handleCurrSubmit}>Use Current Location</button>
    </form>
  );
};

export default WeatherForm;
