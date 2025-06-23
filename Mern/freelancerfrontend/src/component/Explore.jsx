import "../styles/explore.css";
import {
  MdDesignServices,
  MdOutlineCampaign,
  MdTranslate,
  MdMovie,
  MdMic,
  MdCode,
  MdBusiness,
  MdSmartphone,
  MdBarChart,
  MdPhotoCamera,
} from "react-icons/md";

function Explore() {
  const categories = [
    { icon: <MdDesignServices />, label: "Graphics & Design" },
    { icon: <MdOutlineCampaign />, label: "Digital Marketing" },
    { icon: <MdTranslate />, label: "Writing & Translation" },
    { icon: <MdMovie />, label: "Video & Animation" },
    { icon: <MdMic />, label: "Music & Audio" },
    { icon: <MdCode />, label: "Programming & Tech" },
    { icon: <MdBusiness />, label: "Business" },
    { icon: <MdSmartphone />, label: "Lifestyle" },
    { icon: <MdBarChart />, label: "Data" },
    { icon: <MdPhotoCamera />, label: "Photography" },
  ];

  return (
    <div className="explore-container">
      <h2>Explore the Marketplace</h2>
      <div className="explore-grid">
        {categories.map((item, index) => (
          <div key={index} className="explore-item">
            <span className="explore-icon">{item.icon}</span>
            <p>{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Explore;
