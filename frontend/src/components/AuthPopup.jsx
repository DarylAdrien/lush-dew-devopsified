import React, { useState } from "react";
import axios from "axios";

const AuthPopup = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const handleSignup = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/user/register/", {
        username,
        password,
      });

      if (response.status === 200) {
        alert("Account created successfully! Please log in.");
        setIsSignup(false);
      }
    } catch (err) {
      setError("Signup failed. Try again.");
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/token/", {
        username,
        password,
      });

      if (response.status === 200) {
        const { access, refresh } = response.data;
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);

        // Decode the JWT to get user role
        const tokenPayload = JSON.parse(atob(access.split(".")[1]));
        const userType = tokenPayload.role || "normal"; // Default to normal if not set
        localStorage.setItem("userType", userType);

        alert(`Welcome, ${username}! You are logged in as a ${userType} customer.`);
        onLogin(username,password);
        onClose();
      }
    } catch (err) {
      setError("Invalid username or password.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Reset error message

    if (isSignup) {
      handleSignup();
    } else {
      handleLogin();
    }
  };

  return (
    <>
      <div
        className="modal fade show d-block"
        tabIndex="-1"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{isSignup ? "Sign Up" : "Login"}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100 my-2">
                  {isSignup ? "Sign Up" : "Login"}
                </button>
              </form>
              <p className="text-center">
                {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
                <button
                  className="btn btn-link"
                  onClick={() => setIsSignup(!isSignup)}
                >
                  {isSignup ? "Login" : "Sign Up"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-backdrop fade show" onClick={onClose}></div>
    </>
  );
};

export default AuthPopup;
