import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home";
import BestSeller from "./pages/Best_seller";
import New from "./pages/New";
import Skincare from "./pages/Skincare";
import Eyes from "./pages/Eyes";
import Face from "./pages/Face";
import Lips from "./pages/Lips";
import Service from "./pages/Service";
import Favorites from "./pages/Favorites";
import Cart from "./pages/Cart";
import ProductPage from "./pages/ProductPage";
import AuthPopup from "./components/AuthPopup";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// function App() {
//   const [showAuth, setShowAuth] = useState(false);
//   const [userType, setUserType] = useState(null);
//   const [username, setUsername] = useState(null);
//   const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

//   useEffect(() => {
//     const fetchUser = async () => {
//       if (!accessToken) return;

//       try {
//         const response = await axios.get("http://127.0.0.1:8000/api/user/info/", {
//           headers: { Authorization: `Bearer ${accessToken}` },
//         });

//         setUsername(response.data.username);
//         setUserType(response.data.role || "normal");

//         // Store in localStorage for persistence
//         localStorage.setItem("activeUser", response.data.username);
//         localStorage.setItem("userType", response.data.role || "normal");
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         handleLogout();
//       }
//     };

//     fetchUser();
//   }, [accessToken]); // Re-run when accessToken changes

//   const handleLogin = async (username , password) => {
//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/token/", {
//         username,
//         password,
//       });

//       const newAccessToken = response.data.access;
//       const refreshToken = response.data.refresh;

//       // Save tokens
//       localStorage.setItem("accessToken", newAccessToken);
//       localStorage.setItem("refreshToken", refreshToken);

//       setAccessToken(newAccessToken); // This will trigger useEffect and update the UI
//       setShowAuth(false);
//     } catch (error) {
//       console.error("Login failed:", error.response?.data || error.message);
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     localStorage.removeItem("userType");
//     localStorage.removeItem("activeUser");

//     setAccessToken(null);
//     setUserType(null);
//     setUsername(null);
//   };

//   return (
//     <Router>
//       <div className="container text-center mt-3 ">
//         <h1>Welcome to Our Store</h1>
//         {userType ? (
//           <div>
//             <h3>Hello, {username}! You are a <strong>{userType}</strong> customer.</h3>
//             <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
//           </div>
//         ) : (
//           <button className="btn btn-primary" onClick={() => setShowAuth(true)}>Login / Sign Up</button>
//         )}
//       </div>

//       <Routes>
//         <Route path="/" element={<Home onAuthClick={() => setShowAuth(true)} />} />
//         <Route path="/best_seller" element={<BestSeller category="bestseller" />} />
//         <Route path="/new" element={<New category="new" />} />
//         <Route path="/face" element={<Face category="face" />} />
//         <Route path="/eyes" element={<Eyes category="eyes" />} />
//         <Route path="/service" element={<Service />} />
//         <Route path="/skincare" element={<Skincare category="skincare" />} />
//         <Route path="/lips" element={<Lips category="lips" />} />
//         <Route path="/favorites" element={<Favorites />} />
//         <Route path="/cart" element={<Cart />} />
//         <Route path="/product/:id" element={<ProductPage />} />
//       </Routes>

//       {showAuth && <AuthPopup onClose={() => setShowAuth(false)} onLogin={handleLogin} />}
//     </Router>
//   );
// }

// export default App;



function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [userType, setUserType] = useState(null);
  const [username, setUsername] = useState(null);
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

  useEffect(() => {
    const fetchUser = async () => {
      if (!accessToken) return;

      try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/info/", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        setUsername(response.data.username);
        setUserType(response.data.role || "normal");

        localStorage.setItem("activeUser", response.data.username);
        localStorage.setItem("userType", response.data.role || "normal");
      } catch (error) {
        console.error("Error fetching user data:", error);
        handleLogout();
      }
    };

    fetchUser();
  }, [accessToken]);

  const handleLogin = async (username, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });

      const newAccessToken = response.data.access;
      const refreshToken = response.data.refresh;

      localStorage.setItem("accessToken", newAccessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setAccessToken(newAccessToken);
      setShowAuth(false);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userType");
    localStorage.removeItem("activeUser");

    setAccessToken(null);
    setUserType(null);
    setUsername(null);
  };

  return (
    <Router>
      {/* <div className="container text-center mt-3">
        <h1>Welcome to Our Store</h1>
        {userType ? (
          <div>
            <h3>Hello, {username}! You are a <strong>{userType}</strong> customer.</h3>
            <button className="btn btn-danger" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <button className="btn btn-primary" onClick={() => setShowAuth(true)}>Login / Sign Up</button>
        )}
      </div> */}

      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              onAuthClick={() => setShowAuth(true)} 
              username={username}
              userType={userType}
              handleLogout={handleLogout}
            />
          } 
        />
        <Route path="/best_seller" element={<BestSeller  onAuthClick={() => setShowAuth(true)} 
              username={username}
              userType={userType}
              handleLogout={handleLogout} category="bestseller" />} />
        <Route path="/new" element={<New category="new" />} />
        <Route path="/face" element={<Face category="face" />} />
        <Route path="/eyes" element={<Eyes category="eyes" />} />
        <Route path="/service" element={<Service />} />
        <Route path="/skincare" element={<Skincare category="skincare" />} />
        <Route path="/lips" element={<Lips category="lips" />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>

      {showAuth && <AuthPopup onClose={() => setShowAuth(false)} onLogin={handleLogin} />}
    </Router>
  );
}

export default App;
