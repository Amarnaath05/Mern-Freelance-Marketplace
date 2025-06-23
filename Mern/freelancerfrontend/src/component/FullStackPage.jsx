import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/FullStackPage.css";

// Importing images
import img1 from "../assets/a.webp";
import img2 from "../assets/s.webp";
import img3 from "../assets/d.webp";
import img4 from "../assets/f.webp";
import img5 from "../assets/g.webp";
import img6 from "../assets/h.webp";
import img7 from "../assets/j.webp";
import img8 from "../assets/k.webp";

const serviceImages = [img1, img2, img3, img4, img5, img6, img7, img8];

const generateServices = () => {
  const sellers = [
    "Aarav Sharma", "Vihaan Patel", "Ishaan Gupta", "Kabir Rao", "Ayaan Nair",
    "Rohan Iyer", "Karthik Menon", "Arjun Desai", "Aditya Verma", "Samar Reddy",
    "Neel Joshi", "Rahul Bhatia", "Vivek Malhotra", "Kunal Tiwari", "Pranav Roy",
    "Rishi Das", "Manish Kumar", "Harsh Singh", "Deepak Chandra", "Rajat Mehra",
    "Surya Patel", "Nikhil Sharma", "Aniket Sinha", "Abhishek Yadav", "Sameer Saxena",
    "Mohit Verma", "Vikas Pandey", "Anirudh Mishra", "Akash Thakur", "Tarun Chauhan",
    "Ujjwal Sen", "Ravindra Pawar"
  ];

  const titles = [
    "E-commerce Website", "Portfolio Website", "WordPress Theme",
    "MERN App", "SEO Optimization", "Next.js Site", "Landing Page", "AI Chatbot"
  ];

  const sellerTypes = ["Freelancer", "Agency"];
  const deliveryTimes = ["24 Hours", "3 Days", "7 Days"];
  const budgets = ["₹5,000 - ₹10,000", "₹10,000 - ₹20,000", "₹20,000+"];

  return sellers.slice(0, 32).map((seller, index) => ({
    id: index + 1,
    image: serviceImages[index % serviceImages.length],
    sellerImage: serviceImages[index % serviceImages.length],
    seller,
    title: titles[index % titles.length],
    rating: (Math.random() * 0.5 + 4.5).toFixed(1),
    reviews: Math.floor(Math.random() * (500 - 50) + 50),
    price: Math.random() * (25000 - 5000) + 5000,
    liked: false,
    sellerType: sellerTypes[index % sellerTypes.length],
    deliveryTime: deliveryTimes[index % deliveryTimes.length],
    budget: budgets[index % budgets.length],
  }));
};

const ServiceCard = () => {
  const [services, setServices] = useState(generateServices());
  const [filters, setFilters] = useState({
    serviceOption: "",
    sellerType: "",
    budget: "",
    deliveryTime: "",
  });

  const navigate = useNavigate();

  const handleFilterChange = (type, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [type]: value,
    }));
  };

  const toggleLike = (id) => {
    setServices((prevServices) =>
      prevServices.map((service) =>
        service.id === id ? { ...service, liked: !service.liked } : service
      )
    );
  };

  const handleCardClick = (title) => {
    if (title === "E-commerce Website") {
      navigate("/ecommerce-details");
    }
  };

  const filteredServices = services.filter((service) => {
    return (
      (!filters.serviceOption || service.title === filters.serviceOption) &&
      (!filters.sellerType || service.sellerType === filters.sellerType) &&
      (!filters.budget || service.budget === filters.budget) &&
      (!filters.deliveryTime || service.deliveryTime === filters.deliveryTime)
    );
  });

  return (
    <div className="services-container">
      {/* Filters */}
      <div className="filters-container">
        <select onChange={(e) => handleFilterChange("serviceOption", e.target.value)}>
          <option value="">Service options</option>
          <option value="E-commerce Website">E-commerce Website</option>
          <option value="Portfolio Website">Portfolio Website</option>
          <option value="WordPress Theme">WordPress Theme</option>
        </select>

        <select onChange={(e) => handleFilterChange("sellerType", e.target.value)}>
          <option value="">Seller details</option>
          <option value="Freelancer">Freelancer</option>
          <option value="Agency">Agency</option>
        </select>

        <select onChange={(e) => handleFilterChange("budget", e.target.value)}>
          <option value="">Budget</option>
          <option value="₹5,000 - ₹10,000">₹5,000 - ₹10,000</option>
          <option value="₹10,000 - ₹20,000">₹10,000 - ₹20,000</option>
          <option value="₹20,000+">₹20,000+</option>
        </select>

        <select onChange={(e) => handleFilterChange("deliveryTime", e.target.value)}>
          <option value="">Delivery time</option>
          <option value="24 Hours">24 Hours</option>
          <option value="3 Days">3 Days</option>
          <option value="7 Days">7 Days</option>
        </select>
      </div>

      {/* Service Cards */}
      <div className="services-list">
        {filteredServices.map((service) => (
          <div
            className="service-card"
            key={service.id}
            onClick={() => handleCardClick(service.title)}
            style={{ cursor: "pointer" }}
          >
            <div className="service-image-container">
              <img src={service.image} alt={service.title} className="service-image" />
              <span
                className={`heart-icon ${service.liked ? "liked" : ""}`}
                onClick={(e) => {
                  e.stopPropagation(); // Prevent navigation when clicking the like button
                  toggleLike(service.id);
                }}
                role="button"
                aria-label={service.liked ? "Unlike" : "Like"}
              >
                {service.liked ? "❤️" : "🤍"}
              </span>
            </div>
            <div className="service-info">
              <div className="seller-details">
                <img src={service.sellerImage} alt={service.seller} className="seller-image" />
                <span>{service.seller}</span>
              </div>
              <p className="service-title">{service.title}</p>
              <div className="rating">⭐ {service.rating} ({service.reviews})</div>
              <div className="price">From <strong>₹{service.price.toFixed(0)}</strong></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCard;
