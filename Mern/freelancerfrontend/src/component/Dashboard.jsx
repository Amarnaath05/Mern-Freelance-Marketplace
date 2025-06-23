import { useState } from "react";
import "../styles/dashboard.css";
import {
  FaHome, FaUser, FaProjectDiagram, FaDollarSign,
  FaChartLine, FaRegLightbulb, FaLifeRing, FaNewspaper,
  FaStar, FaCheckCircle, FaPen, FaPowerOff, FaImage
} from "react-icons/fa";

function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: "Aman Kumar",
    email: "aman.kumar@example.com",
    mobile: "+91-9876543210",
    location: "Coimbatore, Tamil Nadu",
    professionalTitle: "Frontend Developer | React.js Specialist | UI/UX Designer",
    bio: "I’m a passionate front-end developer with 2+ years of experience...",
    skills: "React, JavaScript, Figma, Tailwind CSS, Node.js, HTML, CSS",
    languages: "English, Tamil, Hindi",
    education: "B.E. CSE\nGoogle UX Certificate\nUdemy MERN Course",
    experience: "2+ years in frontend development",
    socialProfiles: {
      linkedin: "https://linkedin.com/in/aman-kumar",
      github: "https://github.com/aman-kumar",
      behance: "https://behance.net/aman-kumar"
    },
    profileStatus: "Available",
    profilePhoto: "/profile.jpg",  // Default profile image
    rating: 4.8,
    reviewsCount: 23,
    portfolio: [
      {
        title: "E-commerce UI",
        tech: "React, Tailwind",
        link: "https://github.com/aman-kumar/ecommerce-ui",
        image: "/portfolio1.jpg",
        desc: "Modern responsive e-commerce frontend UI"
      }
    ],
    earnings: "₹1,20,000",
    projectsDone: 18,
    hoursWorked: 320
  });

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, profilePhoto: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteProfilePhoto = () => {
    setProfile((prev) => ({ ...prev, profilePhoto: "/profile.jpg" }));
  };

  return (
    <div className="dashboard-container">
      <aside className="dashboard-sidebar">
        <ul>
          <li onClick={() => setActiveSection("overview")} className={activeSection === "overview" ? "active" : ""}><FaHome /> Overview</li>
          <li onClick={() => setActiveSection("profile")} className={activeSection === "profile" ? "active" : ""}><FaUser /> Profile</li>
          <li onClick={() => setActiveSection("skills")} className={activeSection === "skills" ? "active" : ""}><FaRegLightbulb /> Skills</li>
          <li onClick={() => setActiveSection("experience")} className={activeSection === "experience" ? "active" : ""}><FaChartLine /> Experience</li>
          <li onClick={() => setActiveSection("portfolio")} className={activeSection === "portfolio" ? "active" : ""}><FaProjectDiagram /> Portfolio</li>
          <li onClick={() => setActiveSection("earnings")} className={activeSection === "earnings" ? "active" : ""}><FaDollarSign /> Earnings</li>
          <li onClick={() => setActiveSection("reviews")} className={activeSection === "reviews" ? "active" : ""}><FaNewspaper /> Reviews</li>
          <li onClick={() => setActiveSection("settings")} className={activeSection === "settings" ? "active" : ""}><FaLifeRing /> Settings</li>
        </ul>
      </aside>

      <main className="dashboard-main">
        {activeSection === "overview" && (
          <div className="overview-card">
            <img src={profile.profilePhoto} alt="Profile" className="overview-img" />
            <div className="overview-info">
              <h2>{profile.fullName}</h2>
              <p>{profile.professionalTitle}</p>
              <p><FaStar className="star-icon" /> {profile.rating} ({profile.reviewsCount} reviews)</p>
              <p><strong>Location:</strong> {profile.location}</p>
              <p className={`status-badge ${profile.profileStatus.toLowerCase()}`}>{profile.profileStatus}</p>
              <button className="edit-btn" onClick={() => setActiveSection("profile")}><FaPen /> Edit Profile</button>
            </div>
          </div>
        )}

        {activeSection === "profile" && (
          <div className="profile-section">
            <div className="flex-between">
              <h2>Profile Details</h2>
              <button className="edit-btn" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? "Save" : "Edit"}
              </button>
            </div>

            {isEditing ? (
              <>
                <input name="fullName" value={profile.fullName} onChange={handleProfileChange} placeholder="Full Name" />
                <input name="email" value={profile.email} onChange={handleProfileChange} placeholder="Email" />
                <input name="mobile" value={profile.mobile} onChange={handleProfileChange} placeholder="Mobile" />
                <textarea name="bio" value={profile.bio} onChange={handleProfileChange} placeholder="Bio" />
                <input name="languages" value={profile.languages} onChange={handleProfileChange} placeholder="Languages" />
              </>
            ) : (
              <>
                <p><strong>Email:</strong> {profile.email}</p>
                <p><strong>Phone:</strong> {profile.mobile}</p>
                <p><strong>Languages:</strong> {profile.languages}</p>
                <p><strong>Bio:</strong> {profile.bio}</p>
              </>
            )}

            <p><strong>Socials:</strong>
              <a href={profile.socialProfiles.linkedin} target="_blank" rel="noreferrer"> LinkedIn </a> |
              <a href={profile.socialProfiles.github} target="_blank" rel="noreferrer"> GitHub </a> |
              <a href={profile.socialProfiles.behance} target="_blank" rel="noreferrer"> Behance </a>
            </p>

            <div className="profile-photo-actions">
              <button onClick={() => document.getElementById("file-input").click()} className="upload-btn"><FaImage /> Upload Photo</button>
              <input type="file" id="file-input" accept="image/*" onChange={handleProfilePhotoChange} style={{ display: "none" }} />
              <button onClick={handleDeleteProfilePhoto} className="delete-btn">Delete Photo</button>
            </div>
          </div>
        )}

        {/* Other sections (skills, experience, portfolio, etc.) remain unchanged */}
      </main>
    </div>
  );
}

export default Dashboard;
