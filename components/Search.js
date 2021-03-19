import SearchIcon from "./SearchIcon.js";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Search() {
  let wikiSearchURL =
    "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=";

  const [searchInputState, setSearchInput] = useState("");
  const [APIresults, setAPIresults] = useState("");

  /* adding keyup eventlistener instead of useEffect because down-arrowing through the results
  should update the word in the search field but not update the search results. */

  useEffect(() => {
    const searchInput = document.getElementById("searchInput");

    function handleKeyUp(e) {
      if (e?.code?.includes("Arrow")) return;
      const searchInputString = e.target.value;
      if (searchInputString === "") {
        return setAPIresults([]);
      }

      const fetchURL = wikiSearchURL + searchInputString;
      fetch(fetchURL)
        .then((response) => response.json())
        .then((data) => setAPIresults(data));
    }
    searchInput.addEventListener("keyup", (e) => handleKeyUp(e));
    return () =>
      searchInput.removeEventListener("keyup", (e) => handleKeyUp(e));
  }, [wikiSearchURL]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.search}>
      <div className={styles.searchContainer}>
        <form className="border searchBar" onSubmit={handleSubmit}>
          <label htmlFor="searchInput"></label>
          <input
            type="text"
            id="searchInput"
            value={searchInputState}
            autoComplete="off"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <SearchIcon />
          <div>
            <input type="submit" id="wikiSearch" value="Wiki Search" />
          </div>
        </form>
      </div>
      <div className="searchContainer searchResults">
        <SearchResults results={APIresults} />
      </div>
    </div>
  );
}

function SearchResults(props) {
  const results = props?.results[1];
  let listItems = [];

  for (let i = 0; i < results?.length; i++) {
    listItems.push(
      <SearchResult
        result={props.results[1][i]}
        key={props.results[1][i]}
        wiki={props.results[3][i]}
      ></SearchResult>
    );
  }
  return <ul className={styles.searchResults}>{listItems}</ul>;
}

function SearchResult(props) {
  const result = props.result
  //const wiki = props.wiki.toString().slice(30);

  return (
    <Link href={`/${result}`}>
      <li className={styles.searchResult}>
        {result}
      </li>
    </Link>
  );
}
