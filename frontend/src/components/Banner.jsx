
// import React from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import heroImage from "../assets/trending1.png";

// const Banner = () => {
//   return (
//     <section
//       className="d-flex align-items-center justify-content-center text-center"
//       style={{
//         background: "linear-gradient(to bottom, rgb(73, 249, 237), rgb(130, 34, 120))",
//         minHeight: "700px",
//         color: "#fff",
//       }}
//     >
//       <div className="container">
//         <div className="row align-items-center">
//           {/* Text Section */}
//           <div className="col-lg-6 text-lg-start text-center text-da">
//             <h1 className="display-4 fw-bold text-uppercase mb-3">
//               Indulge in Luxury, <br /> Embrace the Dew
//             </h1>
//             <p className="fs-5 mb-4">
//               Get <strong>2 free samples</strong> on all orders*
//             </p>
//             <a href="#" className="btn btn-dark btn-lg rounded-pill px-5 py-3 shadow">
//               Shop Now
//             </a>
//           </div>

//           {/* Image Section */}
//           <div className="col-lg-6 mt-4 mt-lg-0 d-flex justify-content-center">
//             <img
//               src={heroImage}
//               alt="Lush Dew Products"
//               className="img-fluid"
//               style={{ maxWidth: "90%", height: "auto", borderRadius: "15px", boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
//             />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Banner;



import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import bgImage from "../assets/hd_pic_banner.png"; // Replace with your background image

const Banner = () => {
  return (
    <section
      className="d-flex align-items-center justify-content-center text-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "700px",
        color: "#fff",
        position: "relative",
      }}
    >
      {/* Optional Overlay for Better Readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.17)", // Adjust opacity as needed
        }}
      ></div>

      <div className="container position-relative">
        <div className="row align-items-center">
          {/* Text Section */}
          <div className="col-lg-6 text-lg-start text-center text-white">
            <h1 className="display-4 fw-bold text-uppercase mb-4">
              Indulge in Luxury, <br /> Embrace the Dew
            </h1>
            <p className="fs-5 mb-5">
              Get <strong>2 free samples</strong> on all orders*
            </p>
            <a href="/best_seller" className="btn btn-dark btn-lg rounded-pill px-5 py-3 shadow">
              Shop Now
            </a>
          </div>

          {/* Image Section */}
          {/* <div className="col-lg-6 mt-4 mt-lg-0 d-flex justify-content-center">
            <img
              src={heroImage}
              alt="Lush Dew Products"
              className="img-fluid"
              style={{
                maxWidth: "90%",
                height: "auto",
                borderRadius: "15px",
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
              }}
            />
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Banner;
