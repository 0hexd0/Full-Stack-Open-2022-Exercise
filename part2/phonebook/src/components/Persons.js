import personService from "../services/persons";

const Persons = ({ persons, freshPersons }) => {
  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService.deleteOne(person.id).then((response) => {
        freshPersons();
      });
    }
  };

  return (
    <div>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
          <button type="submit" onClick={() => deletePerson(person)}>
            delete
          </button>
        </p>
      ))}
    </div>
  );
};

export default Persons;
