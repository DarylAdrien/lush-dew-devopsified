import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Makeuppic from "../assets/makeup_service.png";
import Bannerimg from "../assets/banner_black.png";
import GoogleMapEmbed from "../components/GoogleMapEmbed";

const Service = () => {
    return (
        <>
            <Navbar />

            <div className="w-full">
                {/* Hero Section */}
                <div className="relative w-full bg-cover bg-center flex items-center justify-center"
                    style={{ backgroundImage: `url(${Bannerimg})`  , height:'300px'}}>  
                    <div className="absolute inset-0 bg-opacity-60 flex flex-col items-center justify-center text-center p-6">
                        <h1 className="text-white text-4xl md:text-6xl font-bold">
                            FIND A LUSH DEW STORE, EVENTS, SERVICES
                        </h1>
                        <br />
                        <br />
                        <div className="mt-6 flex space-x-2">
                            <input
                                type="text"
                                placeholder="CITY, PIN CODE"
                                className="p-4 w-80 border border-gray-300 rounded-md focus:outline-none"
                            />
                            <button className="bg-black text-white px-8 py-4 rounded-md">SEARCH</button>
                        </div>
                    </div>  
                    
                </div>
                    <br />

                    <GoogleMapEmbed />
                <h1 className="text-center fw-bold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "2rem" }}>
                    MAKEUP SERVICE
                </h1>
                <br />

                {/* Makeup Services Section */}
                <div className="position-relative w-100" style={{ height: "500px" }}>
                    {/* Background Image */}
                    <img src={Makeuppic} alt="makeup_service" className="w-100 h-100 object-fit-cover"  style={{ opacity: 0.6 }} />

                    {/* Overlay Text */}
                    <div className="position-absolute top-50 start-50 translate-middle text-center text-black p-4" >
                        <h2 className="fw-bold fs-1">MAKEUP SERVICES</h2>
                        <p className="mt-3 fs-5">
                            Discover our makeup services and consultations tailored just for you. 
                            Get expert advice and professional makeup services at our stores.
                        </p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Service;
