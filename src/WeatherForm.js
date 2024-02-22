import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './WeatherForm.css';
const WeatherForm = ({ getWeather, getCurrentLocation }) => {
  const [location, setLocation] = useState('');
  const [cityOptions, setCityOptions] = useState([]);
  useEffect(() => {
    const fetchCities = async () => {
      if (location.trim() !== '') {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`
          );
          const cities = response.data.map((city) => ({
            value: city.name,
            label: `${city.name}, ${city.country}`,
          }));
          setCityOptions(cities);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      } else {
        setCityOptions([]);
      }
    };

    const timeoutId = setTimeout(fetchCities, 500); // Debounce search to reduce API requests
    return () => clearTimeout(timeoutId);
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getWeather(location);
  };

  const handleCurrSubmit = () => {
    getCurrentLocation();
  };
  const handleSubmitSuggestion = (city) => {
    setCityOptions([]);
    getWeather(city);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Enter location"
      />
      <button type="submit">Get Weather</button>
      <button type="button" onClick={handleCurrSubmit}>
        Use Current Location
      </button>

      {/* Display city options */}
      {cityOptions.length > 0 && (
        <div>
          <p>Search Suggestions:</p>
          {cityOptions.map((city) => (
            <div key={city.value}>
              <button type="button" onClick={() => {handleSubmitSuggestion(city.value);}}>
                {city.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </form>
  );
};

export default WeatherForm;
