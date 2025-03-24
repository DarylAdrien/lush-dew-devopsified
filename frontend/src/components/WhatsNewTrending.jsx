import React from "react";

// Import images (Replace with actual paths)
import lipstickImage from "../assets/trending1.png"; 
import concealerImage from "../assets/trending2.png"; 

const WhatsNewTrending = () => {
  return (
    <div className="container mt-5">
      <h2 className="fw-bold  mb-4">WHAT'S NEW AND TRENDING</h2>
      <div className="row">
        {/* First Product */}
        <div className="col-md-6">
          <div className="card border-0">
            <img src={lipstickImage} alt="Lipstick" className="img-fluid rounded" />
            <div className="mt-3">
              <h4 className="fw-bold">M·A·C XIMAL SILKY MATTE LIPSTICK</h4>
              <p>Our iconic Lipstick - now maxed out with a new silky matte finish to give lips more.</p>
              <a href="/new" className="fw-bold text-dark text-decoration-underline">SHOP NOW</a>
            </div>
          </div>
        </div>

        {/* Second Product */}
        <div className="col-md-6">
          <div className="card border-0">
            <img src={concealerImage} alt="Concealer" className="img-fluid rounded" style={{height: "425px"}} />
            <div className="mt-3">
              <h4 className="fw-bold">NEW STUDIO RADIANCE CONCEALER</h4>
              <p>Dot, Swipe and Glow! Diminish the look of dark circles over time by 18%.</p>
              <a href="/new" className="fw-bold text-dark text-decoration-underline">SHOP NOW</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsNewTrending;
