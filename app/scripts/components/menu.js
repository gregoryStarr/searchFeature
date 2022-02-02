/**
 * This file will hold the Menu that lives at the top of the Page, this is all rendered using a React Component...
 *
 */
import React, { useState, useEffect } from "react";
import useDebounce from "./hooks/useDebounce";
/*
 * Refactor to modern react stgructure
 */
const Menu = () => {
  // State and setters for ...
  // Search term
  const [searchTerm, setSearchTerm] = useState("");
  // search results
  const [results, setResults] = useState([]);

  const [showingSearch, setShowingSearch] = useState(false);
  // Search status (whether there is pending API request)
  const [isSearching, setIsSearching] = useState(false);
  // Debounce search term so that it only gives us latest value ..@500ms.
  // call api  when user stops typing ...
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  /**
   * Show / hides the search container
   * @memberof Menu
   * @param e [Object] - the event from a click handler
   */
  const showSearchContainer = (e) => {
    e.preventDefault();
    this.setShowingSearch(!this.state.showingSearch);
  };

  /**
   * Calls upon search change
   * @memberof Menu
   * @param e [Object] - the event from a text change handler
   */

   function searchCharacters(search) {
    const apiKey = "f9dfb1e8d466d36c27850bedd2047687";
    return fetch(
      `https://gateway.marvel.com/v1/public/comics?apikey=${apiKey}&titleStartsWith=${search}`,
      {
        method: "GET",
      }
    )
      .then((r) => r.json())
      .then((r) => r.data.results)
      .catch((error) => {
        console.error(error);
        return [];
      });
  }

  // Side effects...
  useEffect(
    () => {
      if (debouncedSearchTerm) {
        setIsSearching(true);
        searchCharacters(debouncedSearchTerm).then((results) => {
          setIsSearching(false);
          setResults(results);
          setShowingSearch(true);
        });
      } else {
        setResults([]);
        setIsSearching(false);
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
  );

  /**
   * Renders the default app in the window, we have assigned this to an element called root.
   *
   * @returns JSX
   * @memberof App
   */
  const onSearch = (e) => {
    e.preventDefault();
    setSearchTerm(e.target.value);
  };

  return (
    <header className="menu">
      <div className="menu-container">
        <div className="menu-holder">
          <h1>ELC</h1>
          <nav>
            <a href="#" className="nav-item">
              HOLIDAY
            </a>
            <a href="#" className="nav-item">
              WHAT'S NEW
            </a>
            <a href="#" className="nav-item">
              PRODUCTS
            </a>
            <a href="#" className="nav-item">
              BESTSELLERS
            </a>
            <a href="#" className="nav-item">
              GOODBYES
            </a>
            <a href="#" className="nav-item">
              STORES
            </a>
            <a href="#" className="nav-item">
              INSPIRATION
            </a>

            <a
              href="#"
              onClick={(e) => {
                console.log("clicking");
                setShowingSearch(!showSearchContainer);
                console.log(showSearchContainer);
              }}
            >
              <i className="material-icons search">search</i>
            </a>
          </nav>
        </div>
      </div>

      <div
        className={`${showingSearch ? "showing " : ""}showing search-container`}
      >
        <input type="text" onChange={(e) => onSearch(e)} />
        <a href="#" onClick={(e) => showSearchContainer(e)}>
          <i className="material-icons close">close</i>
        </a>
      </div>
    </header>
  );
};

// Export out the React Component
module.exports = Menu;
