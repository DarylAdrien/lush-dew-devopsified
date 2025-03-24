import React from "react";

// Sample images (replace with actual image paths)
import bestSellers from "../assets/services_img/best-sellers.png";
import newArrivals from "../assets/services_img/new.png";
import lips from "../assets/services_img/lips.png";
import face from "../assets/services_img/face.png";
import eyes from "../assets/services_img/eyes.png";
import skincare from "../assets/services_img/skincare.png";

// Service data
const servicesList = [
  { id: 1, name: "Best-Sellers", image: bestSellers, link: "/best_seller" },
  { id: 2, name: "New", image: newArrivals, link: "/new" },
  { id: 3, name: "Lips", image: lips, link: "/lips" },
  { id: 4, name: "Face", image: face, link: "/face" },
  { id: 5, name: "Eyes", image: eyes, link: "/eyes" },
  { id: 6, name: "Skincare", image: skincare, link: "/skincare" },
];

const ShopServices = () => {
  return (
    <div className="container mt-5">
      <h2 className=" fw-bold mb-4">Shop Services</h2>
      <div className="row text-center">
        {servicesList.map((service) => (
          <div key={service.id} className="col-6 col-md-3 col-lg-2 mb-4">
            <a href={service.link} className="text-decoration-none text-dark">
              <img
                src={service.image}
                alt={service.name}
                className="img-fluid rounded-circle shadow-sm"
                style={{ width: "130px", height: "130px", objectFit: "cover" }}
              />
              <p className="mt-2 fw-medium">{service.name}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopServices;
