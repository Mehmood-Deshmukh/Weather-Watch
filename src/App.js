import React, { useState } from 'react';
import WeatherForm from './WeatherForm';
import WeatherInfo from './WeatherInfo';
import Forecast from './Forecast';
import ErrorMessage from './ErrorMessage';
import Loader from './Loader';
import './App.css';

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const apiKey = '0928d8aa86ee7325e1ba51e2e5769035';

  const getWeather = async (location) => {
    try {
      setLoading(true);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error('Location not found');
      }
      const data = await response.json();
      console.log(data);
      setWeatherData(data);
      setError('');
      changeBackground(data.weather[0].main); // Change background color based on weather
    } catch (error) {
      setWeatherData(null);
      setError(error.message);
    } finally {
      setLoading(false);
    }

    try {
      setLoading(true);
      const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`);
      if (!response.ok) {
        throw new Error('Forecast not available');
      }
      const data = await response.json();
      setForecastData(data);
      setError('');
    } catch (error) {
      setForecastData(null);
      if (error.message !== "Cannot read properties of undefined (reading 'dt')") {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  const getCurrentLocation = () => {
    setLoading(true)
    console.log("clicked")
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        fetch(api)
          .then(response => {
            if (!response.ok) {
              throw new Error('Unable to get current location weather');
            }
            return response.json();
          })
          .then(data => {
            console.log(data);
            getWeather(data.name);
          })
          .catch(error => {
            setError(error.message);
          });
      });
    } else {
      setError('Geolocation is not supported by your browser');
    }
  };

  const changeBackground = (weatherCondition) => {
    let backgroundColor;

    switch (weatherCondition.toLowerCase()) {
      case 'clouds':
        backgroundColor = '#b0c4de'; // Light steel blue
        break;
      case 'clear':
        backgroundColor = '#87ceeb'; // Sky blue
        break;
      case 'rain':
        backgroundColor = '#4682b4'; // Steel blue
        break;
      case 'drizzle':
        backgroundColor = '#708090'; // Slate gray
        break;
      case 'thunderstorm':
        backgroundColor = '#2f4f4f'; // Dark slate gray
        break;
      case 'snow':
        backgroundColor = '#f0ffff'; // Azure
        break;
      case 'mist':
        backgroundColor = '#d3d3d3'; // Light grey
        break;
      case 'smoke':
        backgroundColor = '#dcdcdc'; // Gainsboro
        break;
      case 'haze':
        backgroundColor = '#f5deb3'; // Wheat
        break;
      case 'dust':
        backgroundColor = '#deb887'; // Burlywood
        break;
      case 'fog':
        backgroundColor = '#e6e6fa'; // Lavender
        break;
      case 'sand':
        backgroundColor = '#eedd82'; // Gold
        break;
      case 'ash':
        backgroundColor = '#808080'; // Gray
        break;
      case 'squall':
        backgroundColor = '#add8e6'; // Light blue
        break;
      case 'tornado':
        backgroundColor = '#ff6347'; // Tomato
        break;
      default:
        backgroundColor = '#f0f0f0'; // Default background color
    }

    document.body.style.backgroundColor = backgroundColor;
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="weather-container">
        <WeatherForm getWeather={getWeather} getCurrentLocation={getCurrentLocation}/>
        {loading && <Loader />}
        {error && <ErrorMessage message={error} />}
        {weatherData && <WeatherInfo weatherData={weatherData} />}
        {forecastData && <Forecast forecastData={forecastData} />}
      </div>
    </div>
  );
};

export default App;
