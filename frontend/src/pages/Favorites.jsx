import React, { useEffect, useState } from "react";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);
    const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem("cart")) || []);
    const [userRole, setUserRole] = useState("normal"); // Default role


    useEffect(() => {
        fetchFavorites();
    }, []);

    useEffect(() => {
        // Fetch user role from API or local storage
        const storedRole = localStorage.getItem("userType") || "normal";
        setUserRole(storedRole);
    }, []);

    const fetchFavorites = () => {
        const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(savedFavorites);
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

    const removeFavorite = (id) => {
        const updatedFavorites = favorites.filter((fav) => fav.id !== id);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        setFavorites(updatedFavorites);
        window.dispatchEvent(new Event("storage"));

    };

    const addToCart = (item) => {
        const updatedCart = [...cart, item];
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        setCart(updatedCart);
        window.dispatchEvent(new Event("storage")); // Notify cart


    };

    return (
        <>
            <Navbar />
            <Container className="mt-4">
                <h2 className="text-center fw-bold mb-4">My Favorites</h2>
                {favorites.length === 0 ? (
                    <p className="text-center text-muted">No favorites added yet.</p>
                ) : (
                    <Row className="g-4">
                        {favorites.map((fav) => (
                            <Col key={fav.id} lg={4} md={6} sm={12}>
                                <Card className="border-0 shadow-lg text-center rounded-4 p-3">
                                    <Card.Img 
                                        variant="top" 
                                        src={`http://127.0.0.1:8000${fav.image}`} 
                                        className="p-2 mx-auto" 
                                        style={{ height: "350px", objectFit: "cover", maxWidth: "100%" }} 
                                    />
                                    <Card.Body>
                                        <h5 className="fw-bold">{fav.title}</h5>
                                        <p className="text-muted small">{fav.subtitle}</p>
                                        {/* <p className="fw-semibold">₹{fav.price}</p> */}
                                        <p>
                                                <strong>₹{getPriceBasedOnRole(fav)}</strong> 
                                                {userRole === "premium" && <span className="text-success ms-2">(10% off)</span>}
                                            </p>
                                        <div className="d-flex justify-content-between">
                                            <Button variant="danger" onClick={() => removeFavorite(fav.id)}>
                                                Remove
                                            </Button>
                                            <Button 
                                                variant={cart.some(cartItem => cartItem.id === fav.id) ? "secondary" : "success"} 
                                                onClick={() => addToCart(fav)}
                                            >
                                                {cart.some(cartItem => cartItem.id === fav.id) ? "Added" : "Add to Cart"}
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
            </Container>
            <Footer />
        </>
    );
};

export default Favorites;
