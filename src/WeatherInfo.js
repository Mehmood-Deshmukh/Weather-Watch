import React from 'react';
import './WeatherInfo.css';

const WeatherInfo = ({ weatherData }) => {
  const { name, main, weather, wind, visibility, sys } = weatherData;
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  const sunriseTime = new Date(sys.sunrise * 1000).toLocaleTimeString('en-US');
  const sunsetTime = new Date(sys.sunset * 1000).toLocaleTimeString('en-US');

  return (
    <div className="weather-info-container">
      <h2 className="location">{`Weather in ${name}`}</h2>
      <p className="date">{`Date and Time: ${formattedDate}`}</p>
      <div className="weather-details">
        <div className="left-column">
          <p className="temperature"><i className="fas fa-thermometer-half"></i> {`${Math.round(main.temp)}°C`}</p>
          <p className="feels-like"><i className="fas fa-temperature-low"></i> {`Feels Like: ${Math.round(main.feels_like)}°C`}</p>
          <p className="description"><i className="fas fa-cloud"></i> {weather[0].description}</p>
        </div>
        <div className="right-column">
          <p className="humidity"><i className="fas fa-tint"></i> {`Humidity: ${main.humidity}%`}</p>
          <p className="wind-speed"><i className="fas fa-wind"></i> {`Wind Speed: ${wind.speed} m/s`}</p>
          <p className="visibility"><i className="fas fa-eye"></i> {`Visibility: ${visibility} meters`}</p>
          <p className="pressure"><i className="fas fa-tachometer-alt"></i> {`Pressure: ${main.pressure} hPa`}</p>
        </div>
      </div>
      <div className="sunrise-sunset">
        <p className="sunrise"><i className="fas fa-sun"></i> {`Sunrise: ${sunriseTime}`}</p>
        <p className="sunset"><i className="fas fa-moon"></i> {`Sunset: ${sunsetTime}`}</p>
      </div>
    </div>
  );
};

export default WeatherInfo;
