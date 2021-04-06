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
    
    let searchInputString;

    setSearchInput((state) => {
      searchInputString = state.input;
      return { ...state, typed: searchInputString };
    });

    // if search is empty, clear search results and don't fetch
    if (searchInputString === "") {
      return setAPIresults([]);
    }

    const fetchURL = wikiSearchURL + searchInputString;
    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => setAPIresults(data));
  }

  useEffect(() => {
    console.log(selected, searchInput.input, searchInput.typed);
    if (selected > 0) {
      setSearchInput((state) => {
        return { ...state, input: listItems[selected - 1]["props"]["result"] };
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
    // searchInput.addEventListener("keydown", function (e) {
    //   if (e.key === "ArrowUp") return e.preventDefault();
    // });

    return () => {
      searchInput.removeEventListener("keyup", (e) => handleKeyUp(e));
      // searchInput.removeEventListener("keydown", function (e) {
      //   if (e.key === "ArrowUp") return e.preventDefault();
      // });
    };
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.search}>
      <div className={styles.searchContainer}>
        <form className={styles.searchBar} onSubmit={handleSubmit}>
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
          {/* <div>
            <input type="submit" id="wikiSearch" value="Wiki Search" />
          </div> */}
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
          selected={selected == i + 1 ? true : false}
        ></SearchResult>
      );
    }
    return <ul className={styles.searchResults}>{listItems}</ul>;
  }

  function SearchResult(props) {
    const result = props.result;

    return (
      <Link href={`/${result}`}>
        <li
          className={`${styles.searchResult} ${
            props.selected ? styles.active : ""
          }`}
        >
          {result}
        </li>
      </Link>
    );
  }
}
