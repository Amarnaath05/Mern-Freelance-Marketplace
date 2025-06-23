// src/component/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import PostJob from "./PostJob";
import TrendingServices from "./TrendingServices";
import NextSection from "./NextSection";
import Explore from "./Explore";
import ProjectGallery from "./ProjectGallery";
import ExpertPage from "./ExpertPage";
import FullStackPage from "./FullStackPage";
import EDetails from "./EDetails";
import Payment from "./Payment";
import Login from "./Login";
import Signup from "./Signup";
import Loginfreelancer from "./Loginhr";
import Signupf from "./Signupf";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
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

      {/* ✅ Client-only dashboard route */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRoles={["Client"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
