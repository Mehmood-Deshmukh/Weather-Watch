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

  function changeBackground(weatherCondition) {
    let filter;
  
    switch (weatherCondition.toLowerCase()) {
      case 'clouds':
        filter = 'hue-rotate(180deg) saturate(200%)'; 
        break;
      case 'clear':
        filter = 'hue-rotate(0deg) saturate(100%)';
        break;
      case 'rain':
        filter = 'brightness(70%)';
        break;
      case 'drizzle':
        filter = 'contrast(150%)';
        break;
      case 'thunderstorm':
        filter = 'hue-rotate(45deg) saturate(150%)';
        break;
      case 'snow':
        filter = 'brightness(150%)';
        break;
      case 'mist':
        filter = 'contrast(80%)';
        break;
      case 'smoke':
        filter = 'brightness(50%)'; 
        break;
      case 'haze':
        filter = 'contrast(90%)';
        break;
      case 'dust':
        filter = 'contrast(120%)';
        break;
      case 'fog':
        filter = 'contrast(70%)';
        break;
      case 'sand':
        filter = 'contrast(110%)';
        break;
      case 'ash':
        filter = 'brightness(60%)';
        break;
      case 'squall':
        filter = 'hue-rotate(90deg) saturate(150%)';
        break;
      case 'tornado':
        filter = 'hue-rotate(120deg) saturate(200%)';
        break;
      default:
        filter = ''; 
    }
  
    document.body.style.filter = filter;
  }
  

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
