import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/EDetails.css";
import serviceImg from "../assets/ban.jpg"; 
import sellerPic from "../assets/seller.png"; 

const packages = [
  {
    id: "basic",
    name: "Basic",
    price: "₹8,731",
    description: "Starter Software Solution 1 Page Basic Website Development (CMS) Website only",
    delivery: "6-day delivery",
    revisions: "Unlimited Revisions",
    details: [
      "Functional website",
      "3 pages",
      "Content upload",
      "E-commerce functionality",
      "5 products",
      "Payment Integration",
      "Opt-in form",
      "Autoresponder integration",
      "Speed optimization",
      "Hosting setup",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    price: "₹15,715",
    description: "Customized Software Development Customizable Website Development 5-6 page (CMS) Website Only",
    delivery: "10-day delivery",
    revisions: "Unlimited Revisions",
    details: [
      "Functional website",
      "5 pages",
      "Content upload",
      "E-commerce functionality",
      "10 products",
      "Payment Integration",
      "Opt-in form",
      "Autoresponder integration",
      "Speed optimization",
      "Hosting setup",
    ],
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹33,176",
    description: "Bespoke Software Engineering Large-scale Website Development (CMS) Website Only",
    delivery: "14-day delivery",
    revisions: "Unlimited Revisions",
    details: [
      "Functional website",
      "10 pages",
      "Content upload",
      "E-commerce functionality",
      "20 products",
      "Payment Integration",
      "Opt-in form",
      "Autoresponder integration",
      "Speed optimization",
      "Hosting setup",
    ],
  },
];

const ServiceView = () => {
  const [selectedPackage, setSelectedPackage] = useState("basic");
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handlePackageChange = (id) => {
    setSelectedPackage(id);
    setExpanded(false);
  };

  const handleContinue = () => {
    navigate("/payment");
  };

  return (
    <div className="serviceview-wrapper">
      <section className="serviceview-about">
        <p className="serviceview-description">
          I will create a custom full-stack website for your business.
          Responsive, fast, and SEO-friendly websites with modern UI/UX.
        </p>
        <div className="serviceview-profile">
          <img src={sellerPic} alt="Seller" className="serviceview-profile-pic" />
          <div>
            <h3 className="seller-name">Rohan Kumar</h3>
            <p className="seller-info">⭐ 5.0 | 255 Reviews | Level 2 Freelancer</p>
          </div>
        </div>
      </section>

      <div className="serviceview-content">
        <aside className="serviceview-left">
          <img src={serviceImg} alt="Service Preview" className="serviceview-preview-img" />
        </aside>

        <aside className="serviceview-right">
          <div className="package-container">
            <div className="package-tabs">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  className={`package-tab ${selectedPackage === pkg.id ? "active" : ""}`}
                  onClick={() => handlePackageChange(pkg.id)}
                >
                  {pkg.name}
                </button>
              ))}
            </div>

            <div className="package-content">
              {packages.map(
                (pkg) =>
                  selectedPackage === pkg.id && (
                    <div key={pkg.id} className="package-details">
                      <h2>{pkg.price}</h2>
                      <p className="package-description">{pkg.description}</p>
                      <p className="package-info">
                        ⏳ {pkg.delivery} | 🔁 {pkg.revisions}
                      </p>
                      <button className="toggle-details" onClick={() => setExpanded(!expanded)}>
                        What s Included {expanded ? "▲" : "▼"}
                      </button>
                      {expanded && (
                        <ul className="package-list">
                          {pkg.details.map((detail, index) => (
                            <li key={index}>✔ {detail}</li>
                          ))}
                        </ul>
                      )}
                      <button className="continue-btn" onClick={handleContinue}>
                        Continue →
                      </button>
                    </div>
                  )
              )}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ServiceView;
