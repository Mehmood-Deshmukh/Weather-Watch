import React from 'react';
import './Forecast.css';

const Forecast = ({ forecastData }) => {
  const forecastList = forecastData.list;

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' }); // Use short weekday format
  };

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">Upcoming Days Forecast</h3>
      <div className="forecast-list">
        {forecastList.map((item, index) => {
          if (index % 8 === 0) { 
            const dayOfWeek = getDayOfWeek(item.dt_txt);
            const temperature = Math.round(item.main.temp);
            const icon = item.weather[0].icon;

            return (
              <div key={index} className="forecast-item">
                <p className="day-of-week">{dayOfWeek}</p>
                <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="Forecast Icon" className="forecast-icon" />
                <p className="forecast-temperature">{`${temperature}°C`}</p>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Forecast;
