import React from 'react';

const WeatherInfo = ({ weatherData }) => {
  return (
    <>
      <h2>{`Weather in ${weatherData.name}`}</h2>
      <p>{`Temperature: ${weatherData.main.temp}°C`}</p>
      <p>{`Description: ${weatherData.weather[0].description}`}</p>
      <p>{`Humidity: ${weatherData.main.humidity}%`}</p>
      <p>{`Wind Speed: ${weatherData.wind.speed} m/s`}</p>
    </>
  );
};

export default WeatherInfo;
