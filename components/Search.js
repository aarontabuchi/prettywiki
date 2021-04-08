import SearchIcon from "./SearchIcon.js";
import ClearIcon from "./ClearIcon.js";
import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Search() {
  let wikiSearchURL =
    "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&search=";

  // typed input is separate and needs to be remembered, vs auto completed search results
  // that also gets displayed in the same input element
  const [searchInput, setSearchInput] = useState({ input: "", typed: "" });
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

    // reset selected back to input if typing
    setSelected(0);
    setSearchInput((state) => {
      return { ...state, typed: searchInputString };
    });

    const fetchURL = wikiSearchURL + searchInputString;
    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => setAPIresults(data));
  }

  // handles the up/down arrow key changing what should be highlighted and updating the input
  // to match the highlighted search result
  useEffect(() => {
    // console.log(selected, searchInput.input, searchInput.typed);
    if (selected > 0) {
      const searchString = searchInput.typed;
      setSearchInput((state) => {
        // wiki uses Title casing. The capitalization of the user needs to be preserved
        return {
          ...state,
          input:
            searchString +
            listItems[selected - 1]["props"]["result"].slice(
              searchString.length
            ),
        };
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
          {/* <label htmlFor="searchInput">Search</label> */}
          <input
            type="text"
            id="searchInput"
            value={searchInput.input}
            autoComplete="off"
            aria-label="Search"
            onChange={(e) =>
              setSearchInput({ ...searchInput, input: e.target.value })
            }
          />
          <ClearSearchButton />
        </form>
      </div>
      <div className={styles.searchResults}>
        <hr className={styles.hr}></hr>
        <SearchResults results={APIresults} />
      </div>
    </div>
  );

  function SearchResults(props) {
    const results = props?.results[1];

    for (let i = 0; i < results?.length; i++) {
      listItems.push(
        <SearchResult
          result={results[i]}
          key={results[i]}
          id={i + 1}
        ></SearchResult>
      );
    }

    return (
      <ul className={styles.searchResults} id="searchResults">
        {listItems}
      </ul>
    );
  }

  function SearchResult({ result, id }) {
    const searchString = searchInput.typed;
    const [classes, setClasses] = useState(`${styles.searchResult}`);

    useEffect(() => {
      if (selected == id) {
        setClasses(`${styles.searchResult} ${styles.active}`);
      }
    }, [selected]);

    // pointer disappears while typing but still triggers mouseover and mouseenter
    // so that arrow key nav doesn't work, but mousemove solves that
    useEffect(() => {
      const item = document.getElementById("searchResults");
      item.addEventListener("mousemove", () => setClasses(styles.searchResult));
      return () => {
        item.removeEventListener("mousemove", () =>
          setClasses(styles.searchResult)
        );
      };
    }, []);

    // function handleOnClick() {
    //   location.href = `/${result}`
    // }

    return (
      <Link href={`/${result}`}>
        <a>
          <li id={id} className={classes}>
            <SearchIcon />
            <span className={styles.resultString}>
              {searchString}
              <span className={styles.bold}>
                {result.slice(searchString.length)}
              </span>
            </span>
          </li>
        </a>
      </Link>
    );
  }

  function ClearSearchButton() {
    const [classes, setClasses] = useState(`${styles.clearIcon}`);

    function handleOnClick() {
      setSearchInput({ input: "", typed: "" });
      setAPIresults([]);
    }

    useEffect(() => {
      if (searchInput.input !== "") {
        setClasses(`${styles.clearIcon} ${styles.clearIconActive}`);
      }
    }, [searchInput]);

    return (
      <div className={classes} onClick={handleOnClick}>
        <ClearIcon />
      </div>
    );
  }
}
