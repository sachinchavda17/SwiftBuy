import { MdClose } from "react-icons/md";
import "./Search.scss";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";

const Search = ({ setShowSearch }) => {
  const [searchProducts, setSearchProducts] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => {
      document.body.style.overflowY = "scroll";
    };
  }, []);

  const callApi = async (searchQuery) => {
    if (!searchQuery) {
      setSearchProducts([]);
      return;
    }
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_DEV_URL}/api/products/search/${searchQuery}`
      );
      setSearchProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchProducts([]);
    }
  };

  // Debounce the API call to avoid making requests on every keystroke
  const debouncedSearch = useCallback(debounce(callApi, 300), []);

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return (
    <div className="search-modal">
      <div className="form-field">
        <input
          type="text"
          autoFocus
          placeholder="Search for Products"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <MdClose onClick={() => setShowSearch(false)} />
      </div>
      <div className="search-result-content">
        <div className="search-results">
          {searchProducts.length > 0 ? (
            searchProducts.map((item) => (
              <div
                key={item._id}
                className="search-result-item"
                onClick={() => {
                  navigate("/product/" + item._id);
                  setShowSearch(false);
                }}
              >
                <div className="img-container">
                  <img src={item?.img} alt="" />
                </div>
                <div className="prod-details">
                  <span className="name">{item?.title}</span>
                  <span className="desc">{item?.desc}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">No products found.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Search;
