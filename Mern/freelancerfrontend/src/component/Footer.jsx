import React from "react";
import { FaLinkedin, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import "../styles/Footer.css"; // Ensure proper styling

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Hire Talent Section */}
        <div className="footer-section">
          <h3>Hire Talent</h3>
          <div className="footer-line"></div>
          <ul>
            <li>Hire Freelance Developers</li>
            <li>Hire Freelance Designers</li>
            <li>Hire Freelance Marketers</li>
            <li>Hire Freelance Product Managers</li>
            <li>Hire Freelance Project Managers</li>
            <li>Hire Freelance Finance Experts</li>
          </ul>
        </div>

        {/* Featured Skills Section */}
        <div className="footer-section">
          <h3>Featured Skills</h3>
          <div className="footer-line"></div>
          <div className="skills-grid">
            <ul>
              <li>Software Developers</li>
              <li>Web Developers</li>
              <li>Mobile App Developers</li>
              <li>iOS Developers</li>
              <li>AI Engineers</li>
              <li>Node.js Developers</li>
              <li>PHP Developers</li>
              <li>React.js Developers</li>
              <li>AngularJS Developers</li>
              <li>Python Developers</li>
            </ul>
            <ul>
              <li>Full-stack Developers</li>
              <li>Front-end Developers</li>
              <li>UX Designers</li>
              <li>UI Designers</li>
              <li>Web Designers</li>
              <li>Mobile App Designers</li>
              <li>Graphic Designers</li>
              <li>Brand Designers</li>
              <li>SEO Experts</li>
              <li>Content Creators</li>
            </ul>
          </div>
        </div>

        {/* About Section */}
        <div className="footer-section">
          <h3>About</h3>
          <div className="footer-line"></div>
          <ul>
            <li>Why SkillForge</li>
            <li>Contact Us</li>
            <li>Press Center</li>
            <li>Careers</li>
            <li>About Us</li>
          </ul>
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="footer-line"></div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-left">
          <span className="toptal-logo">SkillForge</span>
          <span className="footer-text">The World s Top Talent, On Demand</span>
        </div>
        <div className="social-icons">
          <FaLinkedin />
          <FaTwitter />
          <FaFacebook />
          <FaInstagram />
        </div>
      </div>

      {/* Horizontal Line */}
      <div className="footer-line"></div>

      {/* Copyright Section */}
      <div className="footer-copyright">
        <span>Copyright 2022 - 2025 SkillForge, LLC</span>
        <span> | </span>
        <span>Privacy Policy</span>
        <span> | </span>
        <span>Website Terms</span>
        <span> | </span>
        <span>Accessibility</span>
      </div>
    </footer>
  );
};

export default Footer;
