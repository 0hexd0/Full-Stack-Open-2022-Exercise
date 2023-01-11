import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const freshPersons = () => {
    personService.getAll().then((persons) => {
      setPersons(persons);
    });
  };

  useEffect(() => {
    freshPersons();
  }, []);

  const handleSearchKeyChange = (event) => {
    setSearchKey(event.target.value);
  };

  const personsToShow = searchKey
    ? persons.filter((person) => person.name.includes(searchKey))
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType} />
      <Filter
        searchKey={searchKey}
        handleSearchKeyChange={handleSearchKeyChange}
      />

      <h3>add a new</h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        showMessage={showMessage}
      />

      <h3>Numbers</h3>
      <Persons persons={personsToShow} freshPersons={freshPersons} />
    </div>
  );
};

export default App;
