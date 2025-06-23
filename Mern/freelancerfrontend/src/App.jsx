import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import PostJob from "./component/PostJob";
import TrendingServices from "./component/TrendingServices";
import NextSection from "./component/NextSection";
import Explore from "./component/Explore";
import ProjectGallery from "./component/ProjectGallery";
import ExpertPage from "./component/ExpertPage";
import Footer from "./component/Footer";
import FullStackPage from "./component/FullStackPage";
import EDetails from "./component/EDetails";
import Payment from "./component/Payment";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Dashboard from "./component/Dashboard";
import Loginfreelancer from "./component/Loginhr";
import Signupf from "./component/Signupf";
import BrowseJobs from "./component/BrowseJobs";  // Import the BrowseJobs component

// Import RoleProvider and ProtectedRoute
import { RoleProvider } from "./contexts/RoleContext";
import ProtectedRoute from "./component/ProtectedRoute";

function App() {
  return (
    <RoleProvider>
      <Router>
        <MainContent />
      </Router>
    </RoleProvider>
  );
}

function MainContent() {
  const location = useLocation();

  // Hide Navbar and Footer on certain pages
  const hideNavbarFooter = [
    "/post-job",
    "/login",
    "/signup",
    "/loginfreelancer",
    "/signupf"
  ].includes(location.pathname);

  return (
    <div>
      {/* Show Navbar only if not on specific routes */}
      {!hideNavbarFooter && <Navbar />}

      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <TrendingServices />
              <NextSection />
              <Explore />
              <ProjectGallery />
              <ExpertPage />
            </>
          }
        />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/loginfreelancer" element={<Loginfreelancer />} />
        <Route path="/signupf" element={<Signupf />} />
        <Route path="/fullstack" element={<FullStackPage />} />
        <Route path="/ecommerce-details" element={<EDetails />} />
        <Route path="/payment" element={<Payment />} />

        {/* Browse Jobs Route */}
        <Route path="/browse-jobs" element={<BrowseJobs />} /> {/* Add the route here */}

        {/* Protected Client Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={["client"]}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {/* Show Footer only if not on specific routes */}
      {!hideNavbarFooter && <Footer />}
    </div>
  );
}

export default App;
