import { useNavigate } from "react-router-dom";
import "../styles/signup.css";

function SignupFreelancer() {
  const navigate = useNavigate();

  return (
    <div className="signup-container">
      <h1>Sign Up as a Freelancer</h1>
      <p>Create your freelancer account to start bidding on jobs.</p>
      <button onClick={() => navigate("/")}>Go Back to Home</button>
    </div>
  );
}

export default SignupFreelancer;
