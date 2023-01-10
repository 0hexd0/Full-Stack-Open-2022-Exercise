import axios from "axios";
import { useEffect, useState } from "react";

const Country = ({ country }) => {
  const languages = Object.values(country.languages);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital ? country.capital[0] : ""}</p>
      <p>area {country.area}</p>
      <h2>languages:</h2>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <p>
        <img src={country.flags.png} alt="flag" />
      </p>
      {country.capital ? (
        <Weather
          capital={country.capital[0]}
          capitalInfo={country.capitalInfo}
        />
      ) : (
        ""
      )}
    </div>
  );
};

const Weather = ({ capital, capitalInfo }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);

  useEffect(() => {
    // const api_key = process.env.REACT_APP_API_KEY;
    // const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${capitalInfo.latlng[0]}&lon=${capitalInfo.latlng[1]}&appid=${api_key}&units=metric`;
    // axios.get(weatherUrl).then((response) => {
    //   console.log(response.data);
    // });
    setWeatherInfo({
      current: {
        dt: 1646318698,
        sunrise: 1646306882,
        sunset: 1646347929,
        temp: 282.21,
        feels_like: 278.41,
        pressure: 1014,
        humidity: 65,
        dew_point: 275.99,
        uvi: 2.55,
        clouds: 40,
        visibility: 10000,
        wind_speed: 8.75,
        wind_deg: 360,
        wind_gust: 13.89,
        weather: [
          {
            id: 802,
            main: "Clouds",
            description: "scattered clouds",
            icon: "03d",
          },
        ],
      },
    });
  }, [capitalInfo]);
  if (weatherInfo) {
    const info = weatherInfo.current;
    return (
      <div>
        <h2>Weather in {capital}</h2>
        <p>temperature {info.temp} Celcius</p>
        <p>
          {info.weather.map((w) => (
            <img
              key={w.id}
              src={`http://openweathermap.org/img/wn/${w.icon}@2x.png`}
              alt="weather"
            ></img>
          ))}
        </p>
        <p>wind {info.wind_speed} m/s</p>
      </div>
    );
  }
};

export default Country;
