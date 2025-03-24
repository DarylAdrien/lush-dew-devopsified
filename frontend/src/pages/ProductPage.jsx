import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [userType, setUserType] = useState("normal");
  const [discountedPrice, setDiscountedPrice] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/products/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchUser = async () => {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/info/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setUserType(response.data.role || "normal");
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchProduct();
    fetchUser();

    // Load cart and favorites from localStorage
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
    setFavorites(JSON.parse(localStorage.getItem("favorites")) || []);
  }, [id]);

  useEffect(() => {
    if (product) {
      const price = parseFloat(product.price) || 0;
      setDiscountedPrice(userType === "premium" ? price * 0.9 : price);
    }
  }, [userType, product]);

  const addToCart = () => {
    if (!cart.find((item) => item.id === product.id)) {
      const updatedCart = [...cart, product];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      window.dispatchEvent(new Event("storage")); // Notify cart update
    }
  };

  const addToFavorites = () => {
    if (!favorites.find((item) => item.id === product.id)) {
      const updatedFavorites = [...favorites, product];
      setFavorites(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      window.dispatchEvent(new Event("storage")); // Notify favorite update
    }
  };

  if (!product) return <p className="text-center">Loading product details...</p>;

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-6">
            <img
              src={`http://127.0.0.1:8000${product.image}`}
              className="img-fluid"
              alt={product.title}
            />
          </div>
          <div className="col-md-6">
            <h2>{product.title}</h2>
            <p className="text-muted">{product.subtitle}</p>
            <p>{product.description}</p>
            <p className="fw-bold">
              ₹{discountedPrice.toFixed(2)}
              {userType === "premium" && <span className="text-success ms-2">(10% off)</span>}
            </p>
            <p>{product.perprice}</p>

            {cart.find((item) => item.id === product.id) ? (
              <button className="btn btn-secondary" disabled>Added to Cart</button>
            ) : (
              <button className="btn btn-dark" onClick={addToCart}>Add to Cart</button>
            )}

            {favorites.find((item) => item.id === product.id) ? (
              <button className="btn btn-warning ms-2" disabled>Added to Favorites</button>
            ) : (
              <button className="btn btn-outline-warning ms-2" onClick={addToFavorites}>
                Add to Favorite
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
