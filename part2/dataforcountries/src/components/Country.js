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
    const api_key = process.env.REACT_APP_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${capitalInfo.latlng[0]}&lon=${capitalInfo.latlng[1]}&appid=${api_key}&units=metric`;
    axios.get(weatherUrl).then((response) => {
      setWeatherInfo(response.data);
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
