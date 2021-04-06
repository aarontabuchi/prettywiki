import SearchIcon from "./SearchIcon.js";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Search() {
  let wikiSearchURL =
    "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=";

  const [searchInput, setSearchInput] = useState({ input: "", typed: "" });
  // const [searchInputTyped, setSearchInputTyped] = useState("");
  const [APIresults, setAPIresults] = useState("");
  const [selected, setSelected] = useState(0);
  let listItems = [];

  function handleKeyUp(e) {
    let searchInputString = e.target.value;

    // if search is empty, clear search results and don't fetch
    if (searchInputString === "") {
      return setAPIresults([]);
    }

    // search results are 1-10. Input acts as 0
    if (e.code == "ArrowDown") {
      setSelected((prevState) => {
        if (prevState < 10) return prevState + 1;
        else return 0;
      });
    }

    if (e.code == "ArrowUp") {
      setSelected((prevState) => {
        if (prevState > 0) return prevState - 1;
        else return 10;
      });
    }

    // Don't update search for non character producing keys. Not sure of the best way to do this
    if (
      e.code.includes("Arrow") ||
      e.code.includes("Meta") ||
      e.code.includes("Control") ||
      e.code.includes("Shift") ||
      e.code.includes("Context") ||
      e.code.includes("Alt")
    ) {
      return;
    }

    setSelected(0);
    setSearchInput((state) => {
      return { ...state, typed: searchInputString };
    });

    const fetchURL = wikiSearchURL + searchInputString;
    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => setAPIresults(data));
  }

  useEffect(() => {
    console.log(selected, searchInput.input, searchInput.typed);
    if (selected > 0) {
      const searchString = searchInput.typed;
      setSearchInput((state) => {
        return { ...state, input: searchString + listItems[selected - 1]["props"]["result"].slice(searchString.length) };
      });
    }
    if (selected == 0) {
      setSearchInput((state) => {
        return { ...state, input: state.typed };
      });
    }
  }, [selected]);

  useEffect(() => {
    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("keyup", (e) => handleKeyUp(e));

    // prevent up arrow from moving cursor to begining of input
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "ArrowUp") return e.preventDefault();
    });

    return () => {
      searchInput.removeEventListener("keyup", (e) => handleKeyUp(e));
      searchInput.removeEventListener("keydown", function (e) {
        if (e.key === "ArrowUp") return e.preventDefault();
      });
    };
  }, []);

  return (
    <div className={styles.search}>
      <div className={styles.searchContainer}>
        <form
          className={styles.searchBar}
          action={searchInput.input}
          method="post"
        >
          <SearchIcon />
          <label htmlFor="searchInput"></label>
          <input
            type="text"
            id="searchInput"
            value={searchInput.input}
            autoComplete="off"
            onChange={(e) =>
              setSearchInput({ ...searchInput, input: e.target.value })
            }
          />
        </form>
      </div>
      <div className={styles.searchResults}>
        <SearchResults results={APIresults} />
      </div>
    </div>
  );

  function SearchResults(props) {
    const results = props?.results[1];

    for (let i = 0; i < results?.length; i++) {
      listItems.push(
        <SearchResult
          result={props.results[1][i]}
          key={props.results[1][i]}
          id={i + 1}
          selected={selected == i + 1 ? true : false}
        ></SearchResult>
      );
    }
    return <ul className={styles.searchResults}>{listItems}</ul>;
  }

  function SearchResult(props) {
    const result = props.result;
    const searchString = searchInput.typed;

    // pointer disappears while typing but still triggers mouseover and mouseenter
    // so that arrow key nav doesn't work, but mousemove solves that
    useEffect(() => {
      const item = document.getElementById(props.id);
      item.addEventListener("mousemove", () => setSelected(props.id));
    });

    return (
      <Link href={`/${result}`}>
        <li
          id={props.id}
          className={`${styles.searchResult} ${
            props.selected ? styles.active : ""
          }`}
        >
          {searchString}
          <span className={styles.bold}>{result.slice(searchString.length)}</span>
        </li>
      </Link>
    );
  }
}
