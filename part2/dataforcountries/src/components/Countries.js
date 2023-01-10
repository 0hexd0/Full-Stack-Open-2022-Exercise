import Country from "./Country";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Countries = ({ countries, countryToShow, setCountryToShow }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (countries.length > 1) {
    return (
      <>
        {countries.map((country) => (
          <div key={country.name.official}>
            {country.name.common}
            <Button text="show" handleClick={() => setCountryToShow(country)} />
          </div>
        ))}
        {countryToShow ? <Country country={countryToShow} /> : ""}
      </>
    );
  }
  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
  return <div>not found</div>;
};

export default Countries;
