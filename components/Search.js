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
  const [selectedVisual, setSelectedVisual] = useState(0);
  const [classes, setClasses] = useState(`${styles.search}`);
  const listItems = [];

  // handles the up/down arrow key changing what should be highlighted and updating the input
  // to match the highlighted search result
  useEffect(() => {
    setSelectedVisual(selected);
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
    if (selected === 0) {
      setSearchInput((state) => {
        return { ...state, input: state.typed };
      });
    }
  }, [selected]);

  useEffect(() => {
    const searchInput = document.getElementById("searchInput");
    
    searchInput.addEventListener("keyup", (e) => handleKeyUp(e));
    searchInput.addEventListener("keydown", (e) => handleKeyDown(e));
    
    if (window.innerWidth < 600) {
      searchInput.blur();
    }
    
    return () => {
      searchInput.removeEventListener("keyup", (e) => handleKeyUp(e));
      searchInput.removeEventListener("keydown", (e) => handleKeyDown(e));
    };
  }, []);

  useEffect(() => {
    if (listItems.length > 0) {
      setClasses(`${styles.search} ${styles.hasResults}`);
    } else setClasses(styles.search);
  }, [listItems]);

  return (
    <div className={classes}>
      <div className={styles.searchContainer}>
        <form className={styles.searchBar} onSubmit={handleSumbit}>
          <SearchIcon />
          <input
            type="text"
            id="searchInput"
            autoFocus
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

  function handleKeyUp(e) {
    let searchInputString = e.target.value;

    // if search is empty, clear search results and don't fetch
    if (searchInputString === "") {
      return setAPIresults([]);
    }

    // Don't update search for non character producing keys. There's a better way, but I'm not sure
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

    setSearchInput((state) => {
      return { ...state, typed: searchInputString };
    });

    // reset selected back to input if typing
    setSelected(0);

    const fetchURL = wikiSearchURL + searchInputString;
    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => setAPIresults(data));
  }

  function handleKeyDown(e) {
    let listItemsLength;

    if (e.code === "Escape") setSelected(0);

    setAPIresults((state) => {
      listItemsLength = state["1"]?.length;
      return { ...state };
    });

    // search results are 1-10. Input acts as 0
    if (e.code === "ArrowDown") {
      setSelectedVisual((state) => {
        if (state < listItemsLength) {
          setSelected(state + 1);
          return state + 1;
        } else {
          setSelected(0);
          return 0;
        }
      });
    }

    if (e.code === "ArrowUp") {
      e.preventDefault();
      setSelectedVisual((state) => {
        if (state > 0) {
          setSelected(state - 1);
          return state - 1;
        } else {
          setSelected(listItemsLength);
          return listItemsLength;
        }
      });
    }
  }

  // open wikimedium page on enter key press
  function handleSumbit(e) {
    e.preventDefault();
    let url = window.location.pathname;
    let extra;
    if (selected === 0) {
      // if the user word is the same word as first search result, use wikipedia's capitalization
      if (APIresults[1][0].toLowerCase() === searchInput.input.toLowerCase()) {
        extra = APIresults[1][0];
      } else {
        extra = searchInput.input;
      }
    } else {
      extra = APIresults[1][selected - 1];
    }

    url += extra;
    window.open(url, "_self");
  }

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
      if (selectedVisual === id) {
        setClasses(`${styles.searchResult} ${styles.active}`);
      } else {
        setClasses(`${styles.searchResult}`);
      }
    }, [selectedVisual]);

    // pointer disappears while typing but still triggers mouseover and mouseenter
    // so that arrow key nav doesn't work, but mousemove solves that
    useEffect(() => {
      const item = document.getElementById(id);
      item.addEventListener("mousemove", handleMouseMove);
      return () => {
        item.removeEventListener("mousemove", handleMouseMove);
      };
    }, []);

    function handleMouseMove() {
      setSelectedVisual(id);
    }

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
