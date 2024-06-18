import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import {
  FaSearch,
  FaWind,
  FaTint,
  FaSun,
  FaCloudSun,
  FaCloudRain,
  FaSnowflake,
} from "react-icons/fa";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

const API_KEY = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
const BASE_URL = "https://api.openweathermap.org/data/2.5/";
const GEO_URL = "https://api.openweathermap.org/geo/1.0/direct";

function WeatherDetails({ unit, weather, forecast }) {
  const icons = {
    Clear: <FaSun />,
    Clouds: <FaCloudSun />,
    Rain: <FaCloudRain />,
    Snow: <FaSnowflake />,
  };

  return (
    <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-semibold mb-2">{weather.name}</h2>
      <p className="text-5xl mb-4 flex items-center">
        {icons[weather.weather[0].main]} {weather.main.temp}
        {unit === "metric" ? "°C" : "°F"}
      </p>
      <p className="text-2xl mb-2 capitalize">
        {weather.weather[0].description}
      </p>
      <p className="text-xl mb-2 flex items-center">
        <FaTint className="mr-2" /> Humidity: {weather.main.humidity}%
      </p>
      <p className="text-xl flex items-center">
        <FaWind className="mr-2" /> Wind Speed: {weather.wind.speed} m/s
      </p>
      {forecast && (
        <Line
          className="mt-4"
          data={{
            labels: forecast.map((f) =>
              new Date(f.dt * 1000).toLocaleDateString()
            ),
            datasets: [
              {
                label: `Temperature (${unit === "metric" ? "°C" : "°F"})`,
                data: forecast.map((f) => f.main.temp),
                borderColor: "rgba(75,192,192,1)",
                backgroundColor: "rgba(75,192,192,0.2)",
                fill: true,
              },
            ],
          }}
        />
      )}
    </div>
  );
}

WeatherDetails.propTypes = {
  unit: PropTypes.string.isRequired,
  weather: PropTypes.shape({
    name: PropTypes.string.isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        main: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  forecast: PropTypes.arrayOf(
    PropTypes.shape({
      dt: PropTypes.number.isRequired,
      main: PropTypes.shape({
        temp: PropTypes.number.isRequired,
      }).isRequired,
    })
  ),
};

function WeatherApp() {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    fetchWeather(location);
  }, [unit]);

  useEffect(() => {
    if (weather) {
      localStorage.setItem("weather", JSON.stringify(weather));
      localStorage.setItem("forecast", JSON.stringify(forecast));
    }
  }, [weather, forecast]);

  useEffect(() => {
    const savedWeather = JSON.parse(localStorage.getItem("weather"));
    const savedForecast = JSON.parse(localStorage.getItem("forecast"));
    if (savedWeather) {
      setWeather(savedWeather);
      setForecast(savedForecast);
    }
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        await fetchWeatherByCoordinates(latitude, longitude);
      });
    }
  }, []);

  const fetchWeather = async (location) => {
    try {
      const response = await axios.get(
        `${BASE_URL}weather?q=${location}&units=${unit}&appid=${API_KEY}`
      );
      const forecastResponse = await axios.get(
        `${BASE_URL}forecast?q=${location}&units=${unit}&appid=${API_KEY}`
      );
      setWeather(response.data);
      setForecast(forecastResponse.data.list);
      setError("");
    } catch (err) {
      setError("Location not found. Please try again.");
      setWeather(null);
      setForecast([]);
    }
  };

  const fetchWeatherByCoordinates = async (lat, lon) => {
    try {
      const response = await axios.get(
        `${BASE_URL}weather?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );
      const forecastResponse = await axios.get(
        `${BASE_URL}forecast?lat=${lat}&lon=${lon}&units=${unit}&appid=${API_KEY}`
      );
      setLocation(response.data.name);
      setWeather(response.data);
      setForecast(forecastResponse.data.list);
      setError("");
    } catch (err) {
      setError("Unable to fetch weather data. Please try again.");
      setWeather(null);
      setForecast([]);
    }
  };

  const fetchSuggestions = async (query) => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }
    try {
      const response = await axios.get(
        `${GEO_URL}?q=${query}&limit=5&appid=${API_KEY}`
      );
      setSuggestions(response.data);
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    }
  };

  const handleSearch = () => {
    if (location.trim() !== "") {
      fetchWeather(location);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion.name);
    setSuggestions([]);
    fetchWeather(suggestion.name);
  };

  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === "metric" ? "imperial" : "metric"));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-500 p-6">
      <h1 className="text-5xl font-bold text-white mb-8">Weather App</h1>
      <div className="flex mb-4 w-full max-w-lg relative">
        <input
          className="w-full p-3 rounded-l-lg border border-gray-300 focus:outline-none"
          type="text"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          placeholder="Enter location"
        />
        <button
          className="bg-blue-700 text-white p-3 rounded-r-lg hover:bg-blue-800"
          onClick={handleSearch}
        >
          <FaSearch />
        </button>
        {suggestions.length > 0 && (
          <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 rounded-lg shadow-md mt-1 z-10">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.lat}
                className="p-3 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}, {suggestion.country}
              </li>
            ))}
          </ul>
        )}
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {weather && (
        <WeatherDetails unit={unit} weather={weather} forecast={forecast} />
      )}
      <button
        className="bg-purple-700 text-white p-2 rounded-lg mt-4 hover:bg-purple-800"
        onClick={toggleUnit}
      >
        Toggle Units ({unit === "metric" ? "°C" : "°F"})
      </button>
    </div>
  );
}

export default WeatherApp;
