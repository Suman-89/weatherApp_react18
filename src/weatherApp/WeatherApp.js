import React, { useEffect, useState } from "react";
import "../weatherApp/WeatherApp.css";
import axios from "axios";

const WeatherApp = () => {
  const apiKey = "7cc1d57ecd833784674fb0d7d024adf3";
  const [inputPlace, setInputPlace] = useState("");
  const [weatherData, setWeatherData] = useState({});


  const getWeatherData = (cityName) => {
    if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apiKey;
    axios
      .get(apiURL)
      .then((response) => {
        console.log(
          "data type-->",
          typeof response.data.name,
          ", city name-->",
          response.data.name
        );
        console.log(
          "data type-->",
          typeof response.data.main.temp,
          ", temparature-->",
          response.data.main.temp
        );
        console.log('response-->',response?.data);
        setWeatherData(response?.data);
        setTimeout(() => {
          setInputPlace("");
        });
      })
      .catch((err) => {
        console.log("err->", err);
        alert("Input city is not enlisted !*");
      });
  };

  useEffect(() => {
    getWeatherData('kolkata');
  }, []);

  const searchBtn = () => {
    // alert("clicked");
    getWeatherData(inputPlace);
  };

  const searchIn = (e) => {
    setInputPlace(e.target.value);
    // console.log("value-->", e.target.value);
  };

  console.log('weatherdata-->',weatherData);
  console.log('weatherData?.main?.temp-->',weatherData?.main?.temp);


  return (
    <>
      <div className="col-md-12">
        <div className="weatherBg">
          <h2 className="heading">Weather App</h2>
          <div className="container my-4 col-4" style={{ margin: "0 auto 0" }}>
            <input
              className="form-control"
              type="text"
              placeholder="Search place"
              aria-label="default input example"
              value={inputPlace}
              onChange={searchIn}
            />
            <button
              className="btn btn-info my-3"
              type="button"
              onClick={searchBtn}
            >
              Search
            </button>
          </div>
        </div>
        <div className="col-md-12 text-center mt-5">
          
          <div className="shadow rounded weather_box">
            {
              weatherData?.main?.temp === undefined ? 
              (<h2>Please search any place</h2>):(
                <><img
                className="back_image"
                src="https://img.freepik.com/premium-vector/flat-sun-cloud-vector-illustration-sun-hiding-cloud-with-long-shadow_118339-1581.jpg?w=360"
                alt=""
              />
              <h5 className="weather_city">{weatherData.name}</h5>
              <h6 className="weather_temp">
                {(weatherData?.main?.temp - 273.15).toFixed(2)}℃{" "}
              </h6>
              </>
              )
            }
            
          </div>
        </div>
      </div>
    </>
  );
};

export default WeatherApp;
