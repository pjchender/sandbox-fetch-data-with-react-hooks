/**
 * https://www.robinwieruch.de/react-hooks-fetch-data
 */

import React, { useState } from "react";
import ReactDOM from "react-dom";

import "./styles.css";
import useFetchData from "./useFetchData";

function App() {
  const [query, setQuery] = useState("");
  const [{ data, isLoading, isError }, setFetchUrl] = useFetchData({
    initialData: {
      hits: []
    },
    initialFetchUrl: "https://hn.algolia.com/api/v1/search"
  });

  return (
    <div className="App ">
      <h1>Fetch data with React Hooks</h1>
      <form
        className="pure-form"
        onSubmit={e => {
          e.preventDefault();
          setFetchUrl(`https://hn.algolia.com/api/v1/search?query=${query}`);
        }}
      >
        <div className="pure-control-group">
          <input
            type="text"
            className="pure-input-rounded"
            onChange={e => {
              setQuery(e.target.value);
            }}
          />
          <button type="submit" className="pure-button button-small">
            Search
          </button>
        </div>
      </form>

      {isError && <p>Something went wrong...</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="pure-menu">
          <ul className="pure-menu-list">
            {Array.isArray(data.hits) &&
              data.hits
                .filter(hit => hit.title)
                .map(hit => (
                  <li className="pure-menu-item" key={hit.objectID}>
                    <a href={hit.url} className="pure-menu-link">
                      {hit.title}
                    </a>
                  </li>
                ))}
          </ul>
        </div>
      )}
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
