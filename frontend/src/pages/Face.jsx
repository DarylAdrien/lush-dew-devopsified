import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SidebarFilter from "../components/SidebarFilter";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const renderStars = (rating) => {
    const fullStar = "★";
    const emptyStar = "☆";
    return fullStar.repeat(rating) + emptyStar.repeat(5 - rating);
};

const Face = ({ category }) => {
    const [bestSellers, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(category || "");
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("");
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("favorites")) || []);
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState("normal"); // Default role


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/products/?category=${selectedCategory}`)
            .then((response) => response.json())
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
            })
            .catch((error) => console.error("Error fetching products:", error));
    }, [selectedCategory]);


    useEffect(() => {
        // Fetch user role from API or local storage
        const storedRole = localStorage.getItem("userType") || "normal";
        setUserRole(storedRole);
    }, []);
    useEffect(() => {
        let updatedProducts = [...bestSellers];

        if (searchQuery) {
            updatedProducts = updatedProducts.filter((product) =>
                product.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (sortOption === "price_low_high") {
            updatedProducts.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
        } else if (sortOption === "price_high_low") {
            updatedProducts.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
        } else if (sortOption === "rating") {
            updatedProducts.sort((a, b) => b.rating - a.rating);
        }

        updatedProducts = updatedProducts.filter(
            (product) => parseFloat(product.price) >= priceRange[0] && parseFloat(product.price) <= priceRange[1]
        );

        setFilteredProducts(updatedProducts);
    }, [searchQuery, sortOption, priceRange, bestSellers]);

    const toggleFavorite = (product) => {
        let updatedFavorites = [...favorites];
        const index = updatedFavorites.findIndex((fav) => fav.id === product.id);
    
        if (index > -1) {
            updatedFavorites.splice(index, 1);
        } else {
            updatedFavorites.push(product);
        }
    
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        window.dispatchEvent(new Event("storage"));
    };

    const addToCart = (product) => {
        let updatedCart = [...cart];
        const index = updatedCart.findIndex((item) => item.id === product.id);

        if (index === -1) {
            updatedCart.push({ ...product, quantity: 1 });
        } else {
            updatedCart[index].quantity += 1;
        }

        setCart(updatedCart);
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        window.dispatchEvent(new Event("storage"));
    };

    const getPriceBasedOnRole = (product) => {
        if (userRole === "normal") {
            return  product.price;
        } else if (userRole === "premium") {
            const price = parseFloat(product.price) || 0;
            return price * 0.9 ;
        }
        return product.price;
    };
    return (
        <>
            <Navbar />
            <h1 className="text-center fw-bold mt-4">FACE</h1>
            <div className="container-fluid mt-4">
                <div className="row">
                    <div className="col-md-3">
                        <SidebarFilter setSelectedCategory={setSelectedCategory} />
                    </div>
                    <div className="col-md-9">
                        <div className="d-flex justify-content-end mb-3">
                            <select className="form-select w-25" onChange={(e) => setSortOption(e.target.value)}>
                                <option value="">Sort By</option>
                                <option value="price_low_high">Price: Low to High</option>
                                <option value="price_high_low">Price: High to Low</option>
                                <option value="rating">Best Rated</option>
                            </select>
                        </div>

                        <label>Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
                        <input
                            type="range"
                            min="0"
                            max="10000"
                            value={priceRange[1]}
                            className="form-range"
                            onChange={(e) => setPriceRange([0, parseFloat(e.target.value)])}
                        />

                        <div className="row mt-3">
                            {filteredProducts.map((item) => (
                                <div key={item.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                    <div className="card border-0 shadow-lg text-center rounded-4 p-3" 
                                         onClick={() => navigate(`/product/${item.id}`)}
                                         style={{ cursor: "pointer" }}>
                                        <div className="position-absolute top-0 end-0 p-2"
                                            style={{ cursor: "pointer", fontSize: "1.5rem", color: favorites.some(fav => fav.id === item.id) ? "red" : "gray" }}
                                            onClick={(e) => { e.stopPropagation(); toggleFavorite(item); }}>
                                            {favorites.some(fav => fav.id === item.id) ? <FaHeart /> : <FaRegHeart />}
                                        </div>
                                        <img src={`http://127.0.0.1:8000${item.image}`} alt={item.title}
                                            className="card-img-top p-2" style={{ height: "350px", objectFit: "cover" }} />
                                        <div className="card-body">
                                            <h5 className="fw-bold">{item.title}</h5>
                                            <p className="text-muted small">{item.subtitle}</p>
                                            <p>{item.description}</p>
                                            <p className="fw-semibold">{item.shades}</p>
                                            <p className="stars">{renderStars(item.rating)}</p>
                                            <p>
                                                <strong>₹{getPriceBasedOnRole(item)}</strong> 
                                                {userRole === "premium" && <span className="text-success ms-2">(10% off)</span>}
                                            </p>
                                                 <p> ₹{item.perprice} </p> 
                                            <p>MRP Inclusive of all taxes</p>
                                            <button
                                                className={`btn ${cart.some(cartItem => cartItem.id === item.id) ? "btn-secondary" : "btn-dark"} w-75 rounded-pill`}
                                                onClick={(e) => { e.stopPropagation(); addToCart(item); }}
                                                disabled={cart.some(cartItem => cartItem.id === item.id)}>
                                                {cart.some(cartItem => cartItem.id === item.id) ? "Added" : "Add to Bag"}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Face;
