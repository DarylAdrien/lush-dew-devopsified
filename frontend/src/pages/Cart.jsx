import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FaTrash } from "react-icons/fa";

const Cart = () => {
    const [cart, setCart] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState("normal"); // Default role
    

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, []);
    useEffect(() => {
            // Fetch user role from API or local storage
            const storedRole = localStorage.getItem("userType") || "normal";
            setUserRole(storedRole);
        }, []);

    const removeFromCart = (productId) => {
        const updatedCart = cart.filter((item) => item.id !== productId);
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
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    };

    const handleBuyNow = () => {
        setShowPopup(true);
        setCart([]); // Clear cart after purchase
        localStorage.removeItem("cart");

        // Hide popup and redirect after 3 seconds
        setTimeout(() => {
            setShowPopup(false);
            navigate("/"); // Redirect to homepage
        }, 3000);
    };

    return (
        <>
            <Navbar />
            <div className="container mt-5">
                <h1 className="text-center fw-bold">Shopping Cart</h1>
                {cart.length === 0 ? (
                    <p className="text-center text-muted mt-4">Your cart is empty.</p>
                ) : (
                    <>
                        <div className="row mt-4">
                            {cart.map((item) => (
                                <div key={item.id} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                                    <div className="card border-0 shadow-lg text-center rounded-4 p-3">
                                        <img
                                            src={`http://127.0.0.1:8000${item.image}`}
                                            alt={item.title}
                                            className="card-img-top p-2"
                                            style={{ width: "100%", height: "300px", objectFit: "cover" }}
                                        />
                                        <div className="card-body">
                                            <h5 className="fw-bold" style={{ fontSize: "20px" }}>{item.title}</h5>
                                            {/* <p className="card-text"><strong style={{ fontSize: "18px" }}>₹{item.price}</strong></p> */}
                                            <p>
                                                <strong>₹{getPriceBasedOnRole(item)}</strong> 
                                                {userRole === "premium" && <span className="text-success ms-2">(10% off)</span>}
                                            </p>
                                            <button
                                                className="btn btn-danger w-50 rounded-pill mt-2"
                                                onClick={() => removeFromCart(item.id)}
                                            >
                                                <FaTrash /> Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-4">
                            <h3>Total: ₹{calculateTotal()}</h3>
                            <button className="btn btn-success w-50 rounded-pill mt-3" onClick={handleBuyNow}>
                                Buy Now
                            </button>
                        </div>
                    </>
                )}
            </div>

            {/* Success Popup */}
            {showPopup && (
                <div className="position-fixed top-50 start-50 translate-middle bg-white border shadow-lg p-5 rounded"
                     style={{
                         width: "550px",
                         height: "400px",
                         textAlign: "center",
                         zIndex: "1050",
                         transition: "opacity 0.5s ease-in-out"
                     }}>
                    <h3 className="text-success">🎉 Congrats! 🎉</h3>
                    <p >"Your order is placed successfully!</p>
                </div>
            )}

            <Footer />
        </>
    );
};

export default Cart;
