import { useState } from "react";
import "../styles/expertPage.css";
import r1 from "../assets/r1.png";
import d1 from "../assets/d1.png";
import d2 from "../assets/d2.png";
import d3 from "../assets/d3.png";

const experts = [
  { name: "Neha", role: "Blockchain Developer", description: "Developing secure and decentralized applications.", country: "India", rating: 5.0, reviews: 85, skills: ["Solidity", "Ethereum", "Smart Contracts", "DeFi"], projects: 55, rate: "Rs 120k/hr", image: d3, topRated: true },
  { name: "Rahul", role: "Full Stack Developer", description: "Building scalable web applications from front-end to back-end.", country: "USA", rating: 4.9, reviews: 190, skills: ["React", "Node.js", "MongoDB", "Express"], projects: 140, rate: "Rs 110k/hr", image: r1, topRated: false },
  { name: "Sneha", role: "Content Strategist", description: "Creating effective content strategies for brands.", country: "Canada", rating: 5.0, reviews: 112, skills: ["SEO", "Content Marketing", "Blog Writing", "Social Media"], projects: 90, rate: "Rs 60k/hr", image: d2, topRated: false },
  { name: "Vikram", role: "Video Editor & Animator", description: "Editing high-quality videos and creating animations.", country: "Germany", rating: 4.8, reviews: 175, skills: ["Premiere Pro", "After Effects", "Motion Graphics"], projects: 80, rate: "Rs 95k/hr", image: d3, topRated: false },
  { name: "Anjali", role: "Voice-over Artist", description: "Providing professional voiceovers in multiple languages.", country: "UK", rating: 5.0, reviews: 98, skills: ["Narration", "Dubbing", "Audiobooks", "Podcast"], projects: 72, rate: "Rs 55k/hr", image: d3, topRated: true },
  { name: "Karthik", role: "DevOps Engineer", description: "Automating infrastructure and CI/CD pipelines.", country: "Australia", rating: 4.7, reviews: 134, skills: ["AWS", "Docker", "Kubernetes", "CI/CD"], projects: 68, rate: "Rs 125k/hr", image: d2, topRated: false },
  { name: "Pooja", role: "Social Media Manager", description: "Managing and growing social media brands.", country: "India", rating: 4.9, reviews: 165, skills: ["Instagram Marketing", "Facebook Ads", "Brand Strategy"], projects: 110, rate: "Rs 75k/hr", image: d1, topRated: false },
  { name: "Arjun", role: "Game Developer", description: "Creating engaging games for mobile and PC.", country: "France", rating: 5.0, reviews: 120, skills: ["Unity", "Unreal Engine", "Game AI"], projects: 65, rate: "Rs 130k/hr", image: d2, topRated: true },
  { name: "Simran", role: "Data Engineer", description: "Designing data pipelines and ETL processes.", country: "USA", rating: 4.8, reviews: 105, skills: ["Big Data", "ETL", "SQL", "Apache Spark"], projects: 75, rate: "Rs 140k/hr", image: d3, topRated: false },
  { name: "Ishaan", role: "Cybersecurity Specialist", description: "Securing networks and preventing cyber threats.", country: "Singapore", rating: 4.9, reviews: 98, skills: ["Ethical Hacking", "Network Security", "Penetration Testing"], projects: 78, rate: "Rs 135k/hr", image: d1, topRated: true },
  { name: "Ritika", role: "UI/UX Designer", description: "Designing intuitive user experiences and interfaces.", country: "India", rating: 5.0, reviews: 120, skills: ["Figma", "Adobe XD", "User Research", "Prototyping"], projects: 92, rate: "Rs 80k/hr", image: d2, topRated: false },
  { name: "Kabir", role: "AI/ML Engineer", description: "Building machine learning models and AI solutions.", country: "Japan", rating: 4.8, reviews: 110, skills: ["TensorFlow", "Python", "Deep Learning", "NLP"], projects: 85, rate: "Rs 150k/hr", image: d3, topRated: false },
];

function ExpertPage() {
  const [likedExperts, setLikedExperts] = useState({});
  const [expandedSkills, setExpandedSkills] = useState({});
  const [showAllExperts, setShowAllExperts] = useState(false);

  const toggleLike = (index) => {
    setLikedExperts((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleSkills = (index) => {
    setExpandedSkills((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="expert-container">
      <h1>Expert Freelancers</h1>
      <p>Search and contact freelancers directly with no obligation</p>

      <div className="expert-list">
        {(showAllExperts ? experts : experts.slice(0, 4)).map((expert, index) => (
          <div key={index} className="expert-card">
            {expert.topRated && <span className="top-rated-badge">⭐ Top Rated</span>}
            <div className="expert-profile-card">
              <img src={expert.image} alt={expert.name} className="expert-img" />
              <h2>{expert.name}</h2>
              <div className="expert-role-box">
                <p className="expert-role">{expert.role}</p>
              </div>
              <div className="expert-description-box">
                <p className="expert-description">{expert.description}</p>
              </div>
              <p className="expert-country">🌎 {expert.country}</p>
            </div>
            <p className="expert-rating">⭐ {expert.rating} ({expert.reviews} reviews)</p>
            <div className="expert-skills">
              {expert.skills.slice(0, expandedSkills[index] ? expert.skills.length : 3).map((skill, i) => (
                <span key={i} className="skill-tag">{skill}</span>
              ))}
              {expert.skills.length > 3 && (
                <button className="more-skills-btn" onClick={() => toggleSkills(index)}>
                  {expandedSkills[index] ? "Show Less" : "..." }
                </button>
              )}
            </div>
            <p className="expert-projects">{expert.projects} projects completed</p>
            <p className="expert-rate">{expert.rate}</p>
            <button className="like-btn" onClick={() => toggleLike(index)}>
              <div className="like-btn-circle">
                <span className="heart-icon">{likedExperts[index] ? "❤️" : "🤍"}</span>
              </div>
            </button>
          </div>
        ))}
      </div>
      <div className="expert-footer">
        <button className="all-freelancers-btn" onClick={() => setShowAllExperts(!showAllExperts)}>
          {showAllExperts ? "SHOW LESS ←" : "ALL FREELANCERS →"}
        </button>
      </div>
    </div>
  );
}

export default ExpertPage;
