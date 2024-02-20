import React from 'react';

const WeatherInfo = ({ weatherData }) => {
  const { name, main, weather, wind, visibility, sys } = weatherData;
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('en-US', options);
  const sunriseTime = new Date(sys.sunrise * 1000).toLocaleTimeString('en-US');
  const sunsetTime = new Date(sys.sunset * 1000).toLocaleTimeString('en-US');

  return (
    <>
      <h2>{`Weather in ${name}`}</h2>
      <p>{`Date and Time: ${formattedDate}`}</p>
      <p>{`Temperature: ${main.temp}°C`}</p>
      <p>{`Feels Like: ${main.feels_like}°C`}</p>
      <p>{`Description: ${weather[0].description}`}</p>
      <p>{`Humidity: ${main.humidity}%`}</p>
      <p>{`Wind Speed: ${wind.speed} m/s`}</p>
      <p>{`Visibility: ${visibility} meters`}</p>
      <p>{`Pressure: ${main.pressure} hPa`}</p>
      <p>{`Sunrise: ${sunriseTime}`}</p>
      <p>{`Sunset: ${sunsetTime}`}</p>
    </>
  );
};

export default WeatherInfo;
