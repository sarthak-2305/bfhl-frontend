import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event) => {
    setJsonInput(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const parsedData = JSON.parse(jsonInput); // Validate JSON input
      if (!parsedData.data) {
        setErrorMessage("Invalid JSON format.");
        return;
      }
      setErrorMessage("");

      const response = await axios.post("https://bfhl-challnege.onrender.com/bfhl", parsedData);
      setResponseData(response.data);
    } catch (error) {
      setErrorMessage("Invalid JSON input or error from the API.");
    }
  };

  const handleFilterChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
    }
  };

  return (
    <div className="App">
      <h1>BFHL Challenge</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={jsonInput}
          onChange={handleInputChange}
          placeholder='Enter JSON like {"data": ["A", "b", "1"]}'
        />
        <br />
        <button type="submit">Submit</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {responseData && (
        <div>
          <h2>Response Data</h2>
          <div>
            <label>
              <input
                type="checkbox"
                value="alphabets"
                onChange={handleFilterChange}
              />
              Alphabets
            </label>
            <label>
              <input
                type="checkbox"
                value="numbers"
                onChange={handleFilterChange}
              />
              Numbers
            </label>
            <label>
              <input
                type="checkbox"
                value="highest_lowercase_alphabet"
                onChange={handleFilterChange}
              />
              Highest Lowercase Alphabet
            </label>
          </div>

          <div>
            {selectedFilters.includes("alphabets") && (
              <p>Alphabets: {JSON.stringify(responseData.alphabets)}</p>
            )}
            {selectedFilters.includes("numbers") && (
              <p>Numbers: {JSON.stringify(responseData.numbers)}</p>
            )}
            {selectedFilters.includes("highest_lowercase_alphabet") && (
              <p>
                Highest Lowercase Alphabet:{" "}
                {JSON.stringify(responseData.highest_lowercase_alphabet)}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;