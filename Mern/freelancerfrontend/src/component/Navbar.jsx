import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import logo from "../assets/logo.jpg";
import profileIcon from "../assets/profile.png";
import { useRole } from "../contexts/RoleContext";

function Navbar() {
  const [showCategories, setShowCategories] = useState(false);
  const [showJobs, setShowJobs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const navigate = useNavigate();
  const profileRef = useRef(null);

  const { role, setRole } = useRole();
  const isLoggedIn = !!localStorage.getItem("authToken");

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setRole(null);
    navigate("/login");
  };

  const normalizedRole = role?.toLowerCase();

  return (
    <nav className="navbar">
      <img src={logo} alt="SkillForge Logo" className="logo" />

      <div className="nav-links">
        <Link to="/">Home</Link>

        {/* CLIENT LINKS */}
        {normalizedRole === "client" && (
          <>
            <div
              className="dropdown"
              onMouseEnter={() => setShowCategories(true)}
              onMouseLeave={() => setShowCategories(false)}
            >
              <Link to="#" className="dropdown-toggle">Categories</Link>
              {showCategories && (
                <div className="dropdown-menu">
                  <div className="dropdown-column">
                    <Link to="#">Full-Stack Development</Link>
                    <Link to="#">UI/UX Design</Link>
                    <Link to="#">SEO Blog Writing</Link>
                    <Link to="#">Social Media Management</Link>
                  </div>
                  <div className="dropdown-column">
                    <Link to="#">Cybersecurity Consulting</Link>
                    <Link to="#">Mobile App Development</Link>
                    <Link to="#">Video Editing</Link>
                    <Link to="#">Content Marketing</Link>
                  </div>
                  <div className="dropdown-column">
                    <Link to="#">Data Science & AI</Link>
                    <Link to="#">Cloud Solutions</Link>
                    <Link to="#">E-commerce Solutions</Link>
                    <Link to="#">Game Development</Link>
                  </div>
                </div>
              )}
            </div>
            <Link to="/browse-jobs">Browse Jobs</Link>
          </>
        )}

        {/* FREELANCER LINKS */}
        {normalizedRole === "freelancer" && (
          <>
            <Link to="/trending-services">Trending</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/create-profile">Create Profile</Link>
            <Link to="/browse-jobs">Bid on Jobs</Link>
          </>
        )}

        {/* ADMIN LINKS */}
        {normalizedRole === "admin" && (
          <>
            <Link to="/admin-dashboard">Dashboard</Link>
            <Link to="/manage-users">Users</Link>
            <Link to="/browse-jobs">Job Listings</Link>
            <Link to="/contact-us">Contact</Link>
            <Link to="/careers">Careers</Link>
            <Link to="/press-center">Press</Link>
            <Link to="/about">About</Link>
          </>
        )}

        {/* Profile & Logout */}
        {isLoggedIn && (
          <div ref={profileRef} className="profile-dropdown">
            <img
              src={profileIcon}
              alt="Profile"
              className="profile-icon"
              onClick={() => setShowProfile(!showProfile)}
            />
            {showProfile && (
              <div className="profile-menu" onClick={(e) => e.stopPropagation()}>
                {normalizedRole === "client" && <Link to="/dashboard">Dashboard</Link>}
                {normalizedRole === "freelancer" && <Link to="/freelancer-dashboard">Freelancer Dashboard</Link>}
                {normalizedRole === "admin" && <Link to="/admin-dashboard">Admin Panel</Link>}
                <Link to="#" onClick={handleLogout}>Logout</Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
