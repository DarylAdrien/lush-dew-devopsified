// import React from "react";
// import ProductCard from "./ProductCard";
// import lipstick from "../assets/lipstick.png";
// import perfume from "../assets/perfume.png";
// import foundation from "../assets/foundation.png";
// import { useEffect, useState } from "react";

// // const products = [
// //   { id: 1, name: "Lipstick", price: '2,550.00', image: lipstick , perprice: '728.57/g' , description: 'Sleek Satin Finish , Hydrates Lips , Pigment Rich Comfortable color',rating:4},
// //     { id: 2, name: "Perfume", price: '3,100', image: perfume ,perprice: '84.00/ml' , description : 'Multitasking Setting Spray, Alcohol-Free, Hydrates/Primes/Sets/Refreshes',rating:0},
// //   { id: 3, name: "Foundation", price: '4,200', image: foundation ,perprice: '281.82/g' , description :'A one-step pressed powder and foundation that gives skin a 12-hour ultra-matte finish while controlling shine and without causing acne.',rating:3},
// // ];



// const ProductList = ({category}) => {
//   const [products, setProducts] = useState([]);

//     useEffect(() => {
//         fetch(`http://127.0.0.1:8000/api/products/?category=${category}`)
//             .then(response => response.json())
//             .then(data => setProducts(data))
//             .catch(error => console.error("Error fetching products:", error));
//     }, [category]);


//   return (
//     <div className="container mt-5">
//       <h2 className="fw-bold mb-4">Shop Favourites</h2> {/* Section Title */}
//       <div className="row">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ProductList;


import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ProductList = ({ category }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://backend-service:8000/api/products/?category=${category}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, [category]);

  // Custom Arrow Components
  const PrevArrow = ({ onClick }) => (
    <button
      className="slick-prev"
      onClick={onClick}
      style={{
        position: "absolute",
        left: "-50px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        background: "black",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        cursor: "pointer",
      }}
    >
      <FaArrowLeft />
    </button>
  );

  const NextArrow = ({ onClick }) => (
    <button
      className="slick-next"
      onClick={onClick}
      style={{
        position: "absolute",
        right: "-50px",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 10,
        background: "black",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        cursor: "pointer",
      }}
    >
      <FaArrowRight />
    </button>
  );

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container mt-5 ">
      <h2 className="fw-bold mb-4 ">Shop Favourites</h2>
      <Slider {...settings}>
        {products.map((product) => (
          <div key={product.id} className="px-3"> {/* Adds spacing between slides */}
            <div style={{ width: "1200px", margin: "auto" }}> {/* Keeps card size uniform */}
              <ProductCard product={product} />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductList;
