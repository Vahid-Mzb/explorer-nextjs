import { useState } from "react";
import axios from "axios";
import SearchResults from "./searchResults"; // Assuming the file is named searchResults.js and is in the same directory
import styles from "@/styles/Home.module.css";

export default function Search({ myResult }) {
  const [searchInput, setSearchInput] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearch = async () => {
    let endpoint = "";
    if (searchInput.length > 6) {
      endpoint = `https://namadaindexer.nodeworld.xyz/transaction/${searchInput}`;
    } else {
      endpoint = `https://namadaindexer.nodeworld.xyz/blocks/${searchInput}`;
    }

    try {
      const response = await axios.get(endpoint);
      setResults(response.data);
      setShowResults(true);
      myResult(true); // Inform the parent component about the search status
    } catch (error) {
      console.error("Error fetching data:", error);
      setShowResults(false);
      myResult(false); // Inform the parent component about the search status
    }
  };

  // Add an event handler for key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <section className={styles.searchContainer}>
      <section className={styles.searchHeader}>
        <section className={styles.searchSection}>
          <h3>The Namada Blockchain Explorer</h3>
          <section className={styles.input_section}>
            <input
              className={styles.inputField}
              value={searchInput}
              type="text"
              id="inputField"
              name="inputField"
              maxLength="120"
              placeholder="Search by Txn Hash / Block "
              required
              onChange={handleInputChange}
              onKeyPress={handleKeyPress} // Add the key press event listener here
            />
            <button className={styles.btn} onClick={handleSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={styles.magnifying}
              >
                <path
                  fillRule="evenodd"
                  d="M10.5 3.75a6.75 6.75 0 100 13.5 6.75 6.75 0 000-13.5zM2.25 10.5a8.25 8.25 0 1114.59 5.28l4.69 4.69a.75.75 0 11-1.06 1.06l-4.69-4.69A8.25 8.25 0 012.25 10.5z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </section>
        </section>
      </section>
      {showResults && <SearchResults results={results} />}
    </section>
  );
}
