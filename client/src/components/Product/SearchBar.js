import { Button } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const SearchBar = () => {
  const [searchResults, setSearchResults] = useState([]);
  const { products } = useSelector((state) => state.productReducer);
  const searchResultContainerRef = useRef();
  const history = useHistory();

  /**
   * @param {String} word
   * @param {String[]} productsAra
   */
  function getSearchResult(word, productsAra) {
    return productsAra.filter((product) => {
      const regex = new RegExp(word, "gi");
      return product.title.match(regex) || product.desc.match(regex);
    });
  }

  function showSearchResults() {
    const searchResultContainer = searchResultContainerRef.current;
    searchResultContainer.style.display = "block";
  }

  function hideSearchResults() {
    const searchResultContainer = searchResultContainerRef.current;

    setTimeout(() => {
      searchResultContainer.style.display = "none";
    }, 100);
  }

  return (
    <div className="searchBar">
      <div className="input_container">
        <input
          type="search"
          placeholder="Search Product"
          onChange={(event) => {
            if (!event.target.value) {
              setSearchResults([]);
            } else {
              setSearchResults(getSearchResult(event.target.value, products));
            }
          }}
          onFocus={showSearchResults}
          onBlur={hideSearchResults}
        />
        <Button
          onClick={() => history.push(`/product/${searchResults[0]._id}`)}
          disabled={!searchResults.length}
          variant="contained"
        >
          <SearchOutlined />
        </Button>

        <div
          className="search_results_container"
          ref={searchResultContainerRef}
        >
          {!searchResults.length ? (
            <div className="no_message">
              <h2>No Search Results</h2>
            </div>
          ) : (
            searchResults.map((result, index) => {
              return (
                <div className="single_search_result" key={index}>
                  <div className="item_img">
                    <img src={result.images[0].photoUrl} alt={result.title} />
                  </div>
                  <div className="item_desc">
                    <p className="title">
                      <Link to={`/product/${result._id}`}>{result.title}</Link>
                    </p>
                    <p className="price">{result.price} $</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
