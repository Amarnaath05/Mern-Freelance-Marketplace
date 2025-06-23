import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { useRole } from "../contexts/RoleContext";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { role } = useRole();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token);
  }, []);

  const handleRoleSelection = (role) => {
    setShowModal(false);
    if (role === "freelancer") {
      navigate("/login"); // freelancer login
    } else if (role === "client") {
      navigate("/loginfreelancer"); // client login
    } else if (role === "admin") {
      navigate("/signup/admin"); // admin route
    }
  };

  return (
    <div className="home-container">
      <header className="hero-section">
        <div className="overlay">
          <h1>
            <i>Find Top Talent or Land Your Next Freelance Job</i>
          </h1>
          <p>Create your profile, bid on exciting jobs, and start earning</p>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for services (e.g., Web Development, Graphic Design)."
            />
            <button>🔍</button>
          </div>
          <div className="buttons">
            {/* Client-specific "Post Job" visible */}
            {role === "client" && (
              <button className="post-job" onClick={() => navigate("/post-job")}>
                Post a Job
              </button>
            )}
            {/* Show Sign Up/Login button if not logged in */}
            {!isLoggedIn && (
              <button
                className="signup-freelancer"
                onClick={() => setShowModal(true)}
              >
                Sign Up / Login
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Modal for Role Selection */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Who are you?</h2>
            <div className="role-buttons">
              <div
                className="role-card"
                onClick={() => handleRoleSelection("freelancer")}
              >
                <span role="img" aria-label="Freelancer">👤</span>
                <p>Freelancer</p>
                <small>Bidding on jobs</small>
              </div>
              <div
                className="role-card"
                onClick={() => handleRoleSelection("client")}
              >
                <span role="img" aria-label="Client">🧑‍💼</span>
                <p>Client</p>
                <small>Hiring freelancers</small>
              </div>
              <div
                className="role-card"
                onClick={() => handleRoleSelection("admin")}
              >
                <span role="img" aria-label="Admin">👑</span>
                <p>Admin</p>
                <small>Managing platform</small>
              </div>
            </div>
            <button className="close-modal" onClick={() => setShowModal(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
