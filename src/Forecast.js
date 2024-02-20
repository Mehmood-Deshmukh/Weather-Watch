import React from 'react';

const Forecast = ({ forecastData }) => {
  return (
    <div id="forecast">
      {forecastData.list.slice(0, 7).map((item, index) => (
        <div key={index} className="forecast-item">
          <p>{new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' })}</p>
          <img src={`http://openweathermap.org/img/w/${item.weather[0].icon}.png`} alt="Forecast Icon" />
          <p>{`${item.main.temp}°C`}</p>
        </div>
      ))}
    </div>
  );
};

export default Forecast;
