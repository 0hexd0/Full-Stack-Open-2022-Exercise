import { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";

const App = () => {
  const [searchKey, setSearchKey] = useState("");
  const [countries, setCountries] = useState([]);
  const [countryToShow, setCountryToShow] = useState(null);

  const handleSearchChange = (event) => {
    setSearchKey(event.target.value);
    setCountryToShow(null);
  };

  const countriesToShow = countries.filter((country) =>
    country.name.common.toUpperCase().includes(searchKey.toUpperCase())
  );

  useEffect(() => {
    axios.get(`https://restcountries.com/v3.1/all`).then((response) => {
      setCountries(response.data);
    });
  }, []);

  return (
    <div>
      <div>
        find countries <input value={searchKey} onChange={handleSearchChange} />
        <Countries
          countries={countriesToShow}
          countryToShow={countryToShow}
          setCountryToShow={setCountryToShow}
        />
      </div>
    </div>
  );
};

export default App;
