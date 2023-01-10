const Filter = ({ searchKey, handleSearchKeyChange }) => {
  return (
    <div>
      filter shown with{" "}
      <input value={searchKey} onChange={handleSearchKeyChange} />
    </div>
  );
};

export default Filter;
