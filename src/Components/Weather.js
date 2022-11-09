// import React from "react";
// import "./weather.css";
import React, { useState } from "react";
import DisplayWeather from "./DisplayWeather";
import "./weather.css";

function Weather() {
  const APIKEY = "6810324e685a709634dd2c6336f508d9";

  const [weather, setWeather] = useState([]);
  const [form, setForm] = useState({
    City: "",
    country: "",
  });

  async function weatherData(e) {
    e.preventDefault();
    if (form.City === "") {
      alert("Add City name");
    } else {
      const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${form.City},${form.country}&APPID=${APIKEY}`
      )
        .then((res) => res.json())
        .then((data) => data);

      setWeather({ data: data });
    }
  }

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "City") {
      setForm({ ...form, City: value });
    }
    if (name === "country") {
      setForm({ ...form, country: value });
    }
  };

  return (
    <div className="weather">
      <span className="title">Weather App </span>
      <br />
      <form>
        <input
          type="text"
          placeholder="City"
          name="City"
          onChange={(e) => handleChange(e)}
        />
        &nbsp; &nbsp; &nbsp;&nbsp;
        <input
          type="text"
          placeholder="Country"
          name="country"
          onChange={(e) => handleChange(e)}
        />
        <button className="getweather" onClick={(e) => weatherData(e)}>
          Submit
        </button>
      </form>
      {/* {console.log(weather)} */}
      {weather.data !== undefined ? (
        <div>
          <DisplayWeather data={weather.data} />
        </div>
      ) : null}
    </div>
  );
}

export default Weather;
