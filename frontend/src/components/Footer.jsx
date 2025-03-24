import React from "react";

const Footer = () => {
  return (
    <footer
      className="text-white py-5 mt-5"
      style={{ backgroundColor: "#111", marginTop: "100px" }} // Darker background & more space
    >
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h6 className="fw-bold">YOUR Lush Dew STORE</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none" style={{ color: "#bbb" }}>Find a Store / Event</a></li>
              <li><a href="#" className="text-decoration-none" style={{ color: "#bbb" }}>Makeup Services</a></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="col-md-3">
            <h6 className="fw-bold">CUSTOMER SERVICE</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none" style={{ color: "#bbb" }}>Contact Us</a></li>
              <li><a href="#" className="text-decoration-none" style={{ color: "#bbb" }}>18002672666</a></li>
              <li><a href="#" className="text-decoration-none" style={{ color: "#bbb" }}>FAQs</a></li>
              <li><a href="#" className="text-decoration-none" style={{ color: "#bbb" }}>Shipping Info</a></li>
              <li><a href="#" className="text-decoration-none" style={{ color: "#bbb" }}>Return Policy</a></li>
            </ul>
          </div>

          {/* About Us */}
          <div className="col-md-3">
            <h6 className="fw-bold">ABOUT US</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none" style={{ color: "#bbb" }}>Our Story</a></li>
              <li><a href="#" className="text-decoration-none" style={{ color: "#bbb" }}>Careers</a></li>
              <li><a href="#" className="text-decoration-none" style={{ color: "#bbb" }}> Lush Dew Cares</a></li>
              <li><a href="#" className="text-decoration-none" style={{ color: "#bbb" }}>Back to Lush Dew</a></li>
            </ul>
          </div>

          {/* Your Account */}
          <div className="col-md-3">
            <h6 className="fw-bold">YOUR ACCOUNT</h6>
            <ul className="list-unstyled">
              <li><a href="#" className="text-decoration-none" style={{ color: "#bbb" }}>My Lush Dew</a></li>
              <li><a href="#" className="text-decoration-none" style={{ color: "#bbb" }}>Order Status</a></li>
              <li><a href="#" className="text-decoration-none" style={{ color: "#bbb" }}>My Favourites</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media and Location */}
        <div className="row mt-4">
          <div className="col-md-6">
            <h6 className="fw-bold">CONNECT</h6>
            <a href="#" className="me-3" style={{ color: "#bbb" }}><i className="fab fa-facebook"></i></a>
            <a href="#" className="me-3" style={{ color: "#bbb" }}><i className="fab fa-youtube"></i></a>
            <a href="#" style={{ color: "#bbb" }}><i className="fab fa-instagram"></i></a>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="text-center mt-4">
          <p className="mb-0">© LUSH DEW ART COSMETICS. ALL WORLDWIDE RIGHTS RESERVED.</p>
          <small>
            <a href="#" className="text-decoration-none me-3" style={{ color: "#bbb" }}>Privacy</a>
            <a href="#" className="text-decoration-none me-3" style={{ color: "#bbb" }}>Terms & Conditions</a>
            <a href="#" className="text-decoration-none" style={{ color: "#bbb" }}>Site Cookie</a>
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
