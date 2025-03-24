import React, { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductCard = ({ product }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [userType, setUserType] = useState("normal");
  const navigate = useNavigate();

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(savedFavorites.some((fav) => fav.id === product.id));

    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setInCart(savedCart.some((item) => item.id === product.id));



    const fetchUser = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/info/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        const userRole = response.data.role || "normal";
        setUserType(userRole);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };


    
    fetchUser();
  }, [product.id, product.price]);
  
  useEffect(() => {
      if (product) {
        const price = parseFloat(product.price) || 0;
        setDiscountedPrice(userType === "premium" ? price * 0.9 : price);
      }
    }, [userType, product]);
  const addToCart = (e) => {
    e.stopPropagation();
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cart.some((item) => item.id === product.id)) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      setInCart(true);
      window.dispatchEvent(new Event("storage"));
    }
  };

  const addToFavorites = (e) => {
    e.stopPropagation();
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (!isFavorite) {
      favorites.push(product);
    } else {
      favorites = favorites.filter((item) => item.id !== product.id);
    }

    localStorage.setItem("favorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
    window.dispatchEvent(new Event("storage"));
  };

  const goToProductPage = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="col-md-4">
      <div className="card h-100 text-center position-relative" onClick={goToProductPage} style={{ cursor: "pointer" }}>
        <div className="position-absolute top-0 end-0 p-2" style={{ cursor: "pointer", fontSize: "1.5rem", color: isFavorite ? "red" : "gray" }} onClick={addToFavorites}>
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </div>

        <img src={`http://127.0.0.1:8000${product.image}`} alt={product.title} className="card-img-top mx-auto" style={{ width: "80%", height: "auto" }} />
        
        <div className="card-body d-flex flex-column align-items-center">
          <h5 className="fw-bold">{product.title}</h5>
          <p className="text-muted small">{product.subtitle}</p>
          <p>{product.description}</p>
          <p className="fw-bold">
            ₹{(discountedPrice).toFixed(2)}  
            {userType === "premium" && <span className="text-success ms-2">(10% off)</span>}
          </p>
          <p>{product.perprice}</p>

          {inCart ? (
            <button className="btn btn-secondary w-50 rounded-pill mt-auto" disabled>Added to Cart</button>
          ) : (
            <button className="btn btn-dark w-50 rounded-pill mt-auto" onClick={addToCart}>Add to Cart</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
