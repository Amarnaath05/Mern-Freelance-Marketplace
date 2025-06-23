import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa"; 
import "../styles/trending.css";
import tr1 from "../assets/tr1.jpg";
import tr2 from "../assets/tr2.jpg";
import tr3 from "../assets/tr3.jpg";
import tr4 from "../assets/tr4.jpg";
import tr5 from "../assets/tr5.jpg";
import tr6 from "../assets/tr6.jpg";
import tr7 from "../assets/tr7.jpg";
import tr8 from "../assets/tr8.jpg";
import tr9 from "../assets/tr9.jpg";
import tr10 from "../assets/tr10.jpg";
import tr11 from "../assets/tr11.webp";
import tr12 from "../assets/tr12.jpg";

const services = [
  { id: 1, title: "Full-Stack Development", description: "Build complete web applications", img: tr1 },
  { id: 2, title: "UI/UX Design", description: "Create intuitive digital experiences", img: tr2 },
  { id: 3, title: "SEO Blog Writing", description: "Create high-ranking articles", img: tr3 },
  { id: 4, title: "Social Media Management", description: "Engage audiences on social platforms", img: tr4 },
  { id: 5, title: "Cybersecurity Consulting", description: "Secure businesses from cyber threats", img: tr5 },
  { id: 6, title: "Mobile App Development", description: "Build native and cross-platform apps", img: tr6 },
  { id: 7, title: "Video Editing", description: "Create engaging video content", img: tr7 },
  { id: 8, title: "Content Marketing", description: "Boost brand awareness with content", img: tr8 },
  { id: 9, title: "Data Science & AI", description: "Turn data into insights", img: tr9 },
  { id: 10, title: "Cloud Solutions", description: "Deploy scalable cloud applications", img: tr10 },
  { id: 11, title: "E-commerce Solutions", description: "Create online stores and platforms", img: tr11 },
  { id: 12, title: "Game Development", description: "Develop immersive gaming experiences", img: tr12 },
];

function TrendingServices() {
  const [search, setSearch] = useState("");
  const [filteredServices, setFilteredServices] = useState(services);
  const navigate = useNavigate();
  const listRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    setFilteredServices(
      services.filter((service) =>
        service.title.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search]);

  useEffect(() => {
    updateScrollButtons();
  }, [filteredServices]);

  const updateScrollButtons = () => {
    if (listRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    }
  };

  const scroll = (direction) => {
    if (listRef.current) {
      listRef.current.scrollBy({ left: direction * 300, behavior: "smooth" });
      setTimeout(updateScrollButtons, 300);
    }
  };

  return (
    <div className="trending-services-container">
      <h1 className="trending-heading">🔥 Trending Services</h1>
      <p className="trending-subtext">Explore the most in-demand services in the freelance world.</p>
      
      <div className="trending-search-bar">
        <input
          type="text"
          className="trending-search-input"
          placeholder="Search services..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="trending-search-btn">
          <FaSearch />
        </button>
      </div>

      <div className="trending-slider-container">
        {canScrollLeft && (
          <button className="slider-btn left" onClick={() => scroll(-1)}>
            <FaChevronLeft />
          </button>
        )}

        <div className="trending-services-list" ref={listRef} onScroll={updateScrollButtons}>
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div
                key={service.id}
                className="trending-service-card"
                onClick={() => {
                  if (service.title === "Full-Stack Development") {
                    navigate("/fullstack");  
                  } else {
                    navigate(`/services/${service.id}`);
                  }
                }}
              >
                <img src={service.img} alt={service.title} className="trending-service-image" />
                <div className="trending-service-info">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No services found.</p>
          )}
        </div>

        {canScrollRight && (
          <button className="slider-btn right" onClick={() => scroll(1)}>
            <FaChevronRight />
          </button>
        )}
      </div>
     
      <div className="trending-buttons">
        <button className="trending-explore-btn" onClick={() => navigate("/services")}>
          Explore More
        </button>
      </div>
    </div>
  );
}

export default TrendingServices;
