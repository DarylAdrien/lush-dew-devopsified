import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo_cosmetic_processed.png";

const Navbar = ({ onAuthClick, username, userType, handleLogout }) => {
  const [favoriteCount, setFavoriteCount] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const updateCounts = () => {
      setFavoriteCount(JSON.parse(localStorage.getItem("favorites"))?.length || 0);
      setCartCount(JSON.parse(localStorage.getItem("cart"))?.length || 0);
    };

    updateCounts();
    window.addEventListener("storage", updateCounts);
    return () => window.removeEventListener("storage", updateCounts);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/products/?search=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    const debounceFetch = setTimeout(fetchResults, 300); // Add a debounce effect
    return () => clearTimeout(debounceFetch);
  }, [searchQuery]);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm" style={{ height: "90px" }}>
      <div className="container-fluid d-flex align-items-center">
        <a className="navbar-brand fw-bold fs-3" href="/">
          <img src={logo} alt="Cosmetic Logo" width="190" height="80" />
        </a>

        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item"><Link className="nav-link fw-bold text-dark mx-2" to="/best_seller">BEST-SELLERS 🔥</Link></li>
            <li className="nav-item"><Link className="nav-link fw-bold text-dark mx-2" to="/new">NEW</Link></li>
            <li className="nav-item"><Link className="nav-link fw-bold text-dark mx-2" to="/lips">LIPS</Link></li>
            <li className="nav-item"><Link className="nav-link fw-bold text-dark mx-2" to="/face">FACE</Link></li>
            <li className="nav-item"><Link className="nav-link fw-bold text-dark mx-2" to="/eyes">EYES</Link></li>
            <li className="nav-item"><Link className="nav-link fw-bold text-dark mx-2" to="/skincare">SKINCARE</Link></li>
            <li className="nav-item"><Link className="nav-link fw-bold text-dark mx-2" to="/service">SERVICE</Link></li>
          </ul>
        </div>

        <div className="d-flex align-items-center ms-auto position-relative">
          {/* Search Bar */}
          <div className="position-relative me-3">
            <input
              className="form-control rounded-pill px-3"
              type="search"
              placeholder="Search"
              aria-label="Search"
              style={{ width: "200px" }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchResults.length > 0 && (
              <ul className="list-group position-absolute bg-white shadow rounded" style={{ top: "40px", width: "100%", zIndex: 1000 }}>
                {searchResults.map((product) => (
                  <li key={product.id} className="list-group-item">
                    <Link to={`/product/${product.id}`} className="text-dark text-decoration-none">
                      {product.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Wishlist */}
          <Link to="/favorites" className="text-dark me-3 position-relative">
            <i className="bi bi-heart fs-4"></i>
            {favoriteCount > 0 && <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">{favoriteCount}</span>}
          </Link>

          {/* Cart */}
          <Link to="/cart" className="text-dark me-4 position-relative">
            <i className="bi bi-bag fs-4"></i>
            {cartCount > 0 && <span className="position-absolute top-0 start-100 translate-middle badge bg-danger">{cartCount}</span>}
          </Link>

          {/* User Profile */}
          <div className="position-relative">
          <button
  className="btn text-dark p-0 border-0"
  onClick={() => {
    if (!userType) {
      if (onAuthClick) {
        onAuthClick(); // Trigger login only if the function exists
      } else {
        console.error("onAuthClick is not defined"); // Debugging info
      }
    } else {
      setShowDropdown(!showDropdown);
    }
  }}
>
  <i className="bi bi-person-circle fs-4"></i>
      </button>
            {showDropdown && userType && (
              <div className="dropdown-menu show position-absolute end-0 bg-white shadow rounded p-2" style={{ top: "40px", width: "180px" }}>
                <p className="mb-1 fw-bold text-center">Hello, {username}</p>
                <p className="mb-1 text-center">{userType} User</p>
                <button className="btn btn-danger w-100 mt-2" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
