import React, { useState } from "react";
import "../styles/ProjectGallery.css";

// Importing images
import project1Image from "../assets/ecommers.jpg";
import project2Image from "../assets/mobileapp.jpg";
import project3Image from "../assets/portfolio.jpg";
import project4Image from "../assets/admindashboard.jpg";

const projects = [
  {
    title: "E-commerce Website",
    category: "Web Design",
    tech: "React, Tailwind CSS",
    description: "A modern, responsive e-commerce website.",
    image: project1Image,
  },
  {
    title: "Mobile App UI",
    category: "App Development",
    tech: "Flutter, Dart",
    description: "A sleek mobile app UI for better user experience.",
    image: project2Image,
  },
  {
    title: "Portfolio Website",
    category: "Web Design",
    tech: "HTML, CSS, JavaScript",
    description: "A personal portfolio to showcase my work.",
    image: project3Image,
  },
  {
    title: "Admin Dashboard",
    category: "App Development",
    tech: "React, Node.js",
    description: "A feature-rich admin dashboard for managing users.",
    image: project4Image,
  },
];

const ProjectGallery = () => {
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredProjects = categoryFilter === "All"
    ? projects
    : projects.filter((project) => project.category === categoryFilter);

  return (
    <div className="project-gallery">
      {/* Filters */}
      <div className="filters">
        <button onClick={() => setCategoryFilter("All")}>All</button>
        <button onClick={() => setCategoryFilter("Web Design")}>Web Design</button>
        <button onClick={() => setCategoryFilter("App Development")}>App Development</button>
      </div>

      {/* Project Grid */}
      <div className="project-grid">
        {filteredProjects.map((project, index) => (
          <div key={index} className="project-card">
            <img src={project.image} alt={project.title} className="project-image" />
            <div className="project-info">
              <h3>{project.title}</h3>
              <p>{project.tech}</p>
              <p className="project-description">{project.description}</p>
            </div>
            <div className="project-overlay">
              <h4>{project.title}</h4>
              <p>{project.description}</p>
              <button className="view-more-btn">View Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
