import axios from 'axios';
import React, { useState } from 'react';
import "./Weather.css"

const Weather = () => {
  const [name, setName] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const APIkey = '32071c6223f08ee0f8693f4954f1e602';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${APIkey}`);
      console.log(response.data)
      setWeather(response.data);
      setError(null);
    } catch (error) {
      setWeather(null);
      setError("Error in fetching");
    }
  };

  return (
    <div className='Main'>
      <h1 className='head'>Weather Checker App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Enter the city name'
        />
        <button type='submit' className='but'>Check Weather</button>
      </form>

      {error && <p>Error: {error}</p>}
      <div className='out'>
        
      {weather && (
        <div>
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp} K</p>
          <p>Description: {weather.weather[0].description}</p>
          {/* You can add more information based on the data received from the API */}
        </div>
      )}

      </div>

    </div>
  );
};

export default Weather;
