import React from 'react';

const Forecast = ({ forecastData }) => {
  const forecastList = forecastData.list;

  const getDayOfWeek = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  return (
    <div id="forecast">
      {forecastList.map((item, index) => {
        if (index % 8 === 0) { // Data for each day is available at intervals of 8 (3-hour intervals)
          const dayOfWeek = getDayOfWeek(item.dt_txt);
          const temperature = item.main.temp;
          const icon = item.weather[0].icon;

          return (
            <div key={index} className="forecast-item">
              <p>{dayOfWeek}</p>
              <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="Forecast Icon" />
              <p>{`${temperature}°C`}</p>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default Forecast;
