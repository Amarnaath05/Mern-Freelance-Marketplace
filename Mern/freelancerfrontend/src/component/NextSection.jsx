import "../styles/nextSection.css";
import { MdCheckCircle } from "react-icons/md"; 
import sampleVideo from "../assets/v.mp4"; 

function NextSection() {
  return (
    <div className="next-section-container">
      <div className="next-section-content">
      
        <div className="next-section-text">
          <h1>A whole world of freelance talent at your fingertips</h1>

          <div className="feature">
            <MdCheckCircle className="check-icon" />
            
            <div>
              <h3>The best for every budget</h3>
              <p>Find high-quality services at every price point. No hourly rates, just project-based pricing.</p>
            </div>
          </div>

          <div className="feature">
            <MdCheckCircle className="check-icon" />
            <div>
              <h3>Quality work done quickly</h3>
              <p>Find the right freelancer to begin working on your project within minutes.</p>
            </div>
          </div>

          <div className="feature">
            <MdCheckCircle className="check-icon" />
            <div>
              <h3>Protected payments, every time</h3>
              <p>Always know what you will pay upfront. Your payment is not  released until you approve the work.</p>
            </div>
          </div>

          <div className="feature">
            <MdCheckCircle className="check-icon" />
            <div>
              <h3>24/7 support</h3>
              <p>Find high-quality services at every price point. No hourly rates, just project-based pricing.</p>
            </div>
          </div>
        </div>
        <div className="next-section-video">
          <video controls>
            <source src={sampleVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  );
}

export default NextSection;
