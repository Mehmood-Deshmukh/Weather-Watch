import React, { useState } from 'react';
import './Forecast.css';

const Forecast = ({ forecastData }) => {
  console.log(forecastData);
  const forecastList = forecastData.list;
  const [hoveredDayInfo, setHoveredDayInfo] = useState(null);

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' }); 
  };

  return (
    <div className="forecast-container">
      <h3 className="forecast-title">Next 7 Days Forecast</h3>
      <div className="forecast-list">
        {forecastList.map((item, index) => {
          if (index % 8 === 0) { 
            const dayOfWeek = getDayOfWeek(item.dt_txt);
            const temperature = Math.round(item.main.temp);
            const iconCode = item.weather[0].icon; 

            return (
              <div
                key={index}
                className="forecast-item"
                onMouseEnter={() => setHoveredDayInfo(item)}
                onMouseLeave={() => setHoveredDayInfo(null)}
              >
                {hoveredDayInfo && hoveredDayInfo.dt === item.dt && (
                  <div className="tooltip">
                    <div className="column">
                      <p>Date: {hoveredDayInfo.dt_txt}</p>
                      <p><i className="fas fa-cloud"></i> Description: {hoveredDayInfo.weather[0].description}</p>
                      <p><i className="fas fa-thermometer-half"></i>Temperature: {temperature}°C</p>
                      <p><i className="fas fa-temperature-low"></i> Feels Like: {Math.round(hoveredDayInfo.main.feels_like)}°C</p>
                    </div>
                    <div className="column">
                      <p><i className="fas fa-tint"></i>Humidity: {hoveredDayInfo.main.humidity}%</p>
                      <p><i className="fas fa-wind"></i>Wind Speed: {hoveredDayInfo.wind.speed} m/s</p>
                      <p><i className="fas fa-eye"></i> Visibility: {hoveredDayInfo.visibility} meters</p>
                      <p><i className="fas fa-tachometer-alt"></i> Pressure: {hoveredDayInfo.main.pressure} hPa</p>
                    </div>
                  </div>
                )}
                <p className="day-of-week">{dayOfWeek}</p>
                <img src={`http://openweathermap.org/img/wn/${iconCode}.png`} alt="Forecast Icon" className="forecast-icon" />
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
