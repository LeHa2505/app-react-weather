import React, { useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState({});
  const [temp, setTemp] = useState(0);
  const [feelsLike, setFeelsLike] = useState(0);
  const [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=895284fb2d2c50a520ea537456963d9c`;

  const convertFahrenheitToCelsius = (fahrenheit) => {
    return (fahrenheit - 32) / 1.8;
  };

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        const celsiusTemp = convertFahrenheitToCelsius(response.data.main.temp);
        setTemp(celsiusTemp);
        setFeelsLike(convertFahrenheitToCelsius(response.data.main.feels_like));
        // setTemp(convertFahrenheitToCelsius(response.data.main.temp));
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {temp ? <h1>{temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? (
              <div>
                <p>{data.weather[0].main}</p>{" "}
                <p>{data.weather[0].description}</p>
              </div>
            ) : null}
          </div>
        </div>

        {data.name !== undefined && (
          <div className="bottom">
            <div>
              <div className="feels">
                {feelsLike ? (
                  <p className="bold">{feelsLike.toFixed()}°C</p>
                ) : null}
                <p>Feels Like</p>
              </div>
              <div className="temp_min">
                {data.main ? (
                  <p className="bold">
                    {convertFahrenheitToCelsius(data.main.temp_min).toFixed()}°C
                  </p>
                ) : null}
                <p>Temp min</p>
              </div>
            </div>

            <div>
              <div className="humidity">
                {data.main ? (
                  <p className="bold">{data.main.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
              <div className="temp_max">
                {data.main ? (
                  <p className="bold">
                    {convertFahrenheitToCelsius(data.main.temp_max).toFixed()}°C
                  </p>
                ) : null}
                <p>Temp max</p>
              </div>
            </div>

            <div>
              <div className="wind">
                {data.wind ? (
                  <p className="bold">{data.wind.speed.toFixed()} MPH</p>
                ) : null}
                <p>Wind Speed</p>
              </div>
              <div className="temp_min">
                {data.main ? (
                  <p className="bold">
                    {convertFahrenheitToCelsius(data.main.pressure).toFixed()}{" "}
                    HPA
                  </p>
                ) : null}
                <p>Sea level</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
