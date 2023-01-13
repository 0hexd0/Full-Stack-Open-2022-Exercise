import { useState } from "react";
import personService from "../services/persons";

const PersonForm = ({ persons, setPersons, showMessage }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (!newName || !newNumber) {
      alert("name or number can not be null");
      return;
    }

    const targetPerson = persons.find((person) => person.name === newName);

    // update
    if (targetPerson) {
      if (
        window.confirm(
          `${targetPerson.name} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(targetPerson.id, {
            ...targetPerson,
            number: newNumber,
          })
          .then((response) => {
            setPersons(
              persons.map((person) =>
                person.id !== targetPerson.id ? person : response
              )
            );
            setNewName("");
            setNewNumber("");
            showMessage(`Added ${newName}`);
          })
          .catch((error) => {
            showMessage(error.response.data.error, "error");
          });
      }

      return;
    }

    personService
      .create({
        name: newName,
        number: newNumber,
      })
      .then((returnedPersons) => {
        setPersons(persons.concat(returnedPersons));
        setNewName("");
        setNewNumber("");
        showMessage(`Added ${newName}`);
      })
      .catch((error) => {
        showMessage(error.response.data.error, "error");
      });
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
