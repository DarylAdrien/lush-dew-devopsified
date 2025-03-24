import { useState } from "react";

const SidebarFilter = ({ setSelectedCategory }) => {
    const [openSections, setOpenSections] = useState({
        productType: true,
        collectionName: false,
        skinType: false,
        price: false,
    });

    const toggleSection = (section) => {
        setOpenSections((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    return (
        <div className="col-md-11" style={{ marginTop: "50px" }}>
           <p className="mb-5" style={{marginTop:"-30px"}}>
                <a href="/" className="text-black text-decoration-none">
                     Home  
                </a>
                          / Products
            </p>
            <div className="p-4 border rounded bg-light shadow-sm ">
                {/* Product Type */}
                <div className="mb-3">
                    <h6 
                        className="fw-bold d-flex justify-content-between align-items-center"
                        onClick={() => toggleSection("productType")}
                        style={{
                            cursor: "pointer",
                            fontSize: "18px",
                            color: "#333",
                            letterSpacing: "1px",
                            transition: "color 0.3s ease",
                        }}
                    >
                        PRODUCT TYPE 
                        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                            {openSections.productType ? "−" : "+"}
                        </span>
                    </h6>
                    {openSections.productType && (
                        <ul className="list-unstyled ps-3" style={{ fontSize: "16px", lineHeight: "2" }}>
                            {["Blushes", "Eye Liners", "Foundations", "Lip Balm", "Lipglosses", "Lip Liners", "Lipsticks", "Liquid Lipsticks", "Makeup Setting Sprays", "Mascaras"].map((item, index) => (
                                <li key={index} className="d-flex align-items-center" style={{ gap: "8px" }}>
                                    <input 
                                        type="checkbox" 
                                        id={item} 
                                        className="form-check-input me-2" 
                                        style={{ transform: "scale(1.2)", cursor: "pointer" }} 
                                    />
                                    <label 
                                        htmlFor={item} 
                                        className="form-check-label"
                                        style={{ cursor: "pointer", fontSize: "15px", color: "#555" }}
                                    >
                                        {item}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Collection Name */}
                <div className="mb-3">
                    <h6 
                        className="fw-bold d-flex justify-content-between align-items-center"
                        onClick={() => toggleSection("collectionName")}
                        style={{
                            cursor: "pointer",
                            fontSize: "18px",
                            color: "#333",
                            letterSpacing: "1px",
                            transition: "color 0.3s ease",
                        }}
                    >
                        COLLECTION NAME 
                        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                            {openSections.collectionName ? "−" : "+"}
                        </span>
                    </h6>
                </div>

                {/* Skin Type */}
                <div className="mb-3">
                    <h6 
                        className="fw-bold d-flex justify-content-between align-items-center"
                        onClick={() => toggleSection("skinType")}
                        style={{
                            cursor: "pointer",
                            fontSize: "18px",
                            color: "#333",
                            letterSpacing: "1px",
                            transition: "color 0.3s ease",
                        }}
                    >
                        SKIN TYPE 
                        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                            {openSections.skinType ? "−" : "+"}
                        </span>
                    </h6>
                </div>

                {/* Price */}
                <div>
                    <h6 
                        className="fw-bold d-flex justify-content-between align-items-center"
                        onClick={() => toggleSection("price")}
                        style={{
                            cursor: "pointer",
                            fontSize: "18px",
                            color: "#333",
                            letterSpacing: "1px",
                            transition: "color 0.3s ease",
                        }}
                    >
                        PRICE 
                        <span style={{ fontSize: "20px", fontWeight: "bold" }}>
                            {openSections.price ? "−" : "+"}
                        </span>
                    </h6>
                </div>

            </div>
        </div>
    );
};

export default SidebarFilter;
