import { useState } from "react";
import { postJob } from "../services/jobServices";
import "../styles/postjob.css";

const PostJob = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "full-time",
    location: "",
    minSalary: "",
    maxSalary: "",
    requiredSkills: "",
    experience: "junior",
    duration: "",
    companyName: "",
    companyAddress: "",
    contactDetails: "",
    applicationInstructions: "",
    logo: null,
    termsAccepted: false,
    perks: "",
    category: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    setFormData((prevData) => ({
      ...prevData,
      logo: uploadedFile,
    }));
  };

  const handleCheckboxChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      termsAccepted: e.target.checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.termsAccepted) {
      alert("You must accept the terms and conditions to post a job.");
      return;
    }

    try {
      const submissionData = new FormData();

      for (const key in formData) {
        if (key === "requiredSkills") {
          const skills = formData.requiredSkills
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill !== "")
            .join(",");
          submissionData.append("requiredSkills", skills);
        } else if (key === "logo" && formData.logo) {
          submissionData.append("logo", formData.logo);
        } else {
          let value = formData[key];
          if (key === "termsAccepted") {
            value = formData[key] ? "true" : "false";
          }
          submissionData.append(key, value);
        }
      }

      // Optional: Debug to inspect form data being sent
      // for (let pair of submissionData.entries()) {
      //   console.log(`${pair[0]}: ${pair[1]}`);
      // }

      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to post a job.");
        return;
      }

      const response = await postJob(submissionData, token);
      console.log("✅ Job posted successfully:", response);
      alert("Job posted successfully!");

      // Reset form
      setFormData({
        title: "",
        description: "",
        type: "full-time",
        location: "",
        minSalary: "",
        maxSalary: "",
        requiredSkills: "",
        experience: "junior",
        duration: "",
        companyName: "",
        companyAddress: "",
        contactDetails: "",
        applicationInstructions: "",
        logo: null,
        termsAccepted: false,
        perks: "",
        category: "",
      });

      e.target.reset(); // reset file input if needed
    } catch (error) {
      console.error("❌ Error posting job:", error.message || error);
      alert(error.message || "Something went wrong while posting the job.");
    }
  };

  return (
    <div className="job-post-page-wrapper">
      <h1 className="job-post-page-title">Post a Job</h1>
      <form onSubmit={handleSubmit} className="job-post-form">
        <div className="job-post-input-group">
          <label htmlFor="title">Job Title</label>
          <input
            type="text"
            name="title"
            id="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            maxLength="100"
          />
        </div>

        <div className="job-post-input-group">
          <label htmlFor="description">Job Description</label>
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            minLength="150"
          />
        </div>

        <div className="job-post-input-group">
          <label htmlFor="type">Job Type</label>
          <select
            name="type"
            id="type"
            value={formData.type}
            onChange={handleInputChange}
          >
            <option value="full-time">Full-Time</option>
            <option value="part-time">Part-Time</option>
            <option value="contract">Contract</option>
            <option value="freelance">Freelance</option>
          </select>
        </div>

        <div className="job-post-input-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            name="location"
            id="location"
            value={formData.location}
            onChange={handleInputChange}
            required
            placeholder="Remote / City, Country"
          />
        </div>

        <div className="job-post-salary-fields">
          <div className="job-post-salary-input-group">
            <label htmlFor="minSalary">Min Salary</label>
            <input
              type="number"
              name="minSalary"
              id="minSalary"
              value={formData.minSalary}
              onChange={handleInputChange}
            />
          </div>
          <div className="job-post-salary-input-group">
            <label htmlFor="maxSalary">Max Salary</label>
            <input
              type="number"
              name="maxSalary"
              id="maxSalary"
              value={formData.maxSalary}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="job-post-input-group">
          <label htmlFor="requiredSkills">Skills Required</label>
          <input
            type="text"
            name="requiredSkills"
            id="requiredSkills"
            value={formData.requiredSkills}
            onChange={handleInputChange}
            placeholder="e.g. React, Node.js"
            required
          />
        </div>

        <div className="job-post-input-group">
          <label htmlFor="experience">Experience Level</label>
          <select
            name="experience"
            id="experience"
            value={formData.experience}
            onChange={handleInputChange}
          >
            <option value="junior">Junior</option>
            <option value="mid-level">Mid-Level</option>
            <option value="senior">Senior</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        {formData.type !== "full-time" && (
          <div className="job-post-input-group">
            <label htmlFor="duration">Job Duration</label>
            <input
              type="text"
              name="duration"
              id="duration"
              value={formData.duration}
              onChange={handleInputChange}
              placeholder="e.g. 3 months, 6 months"
            />
          </div>
        )}

        <div className="job-post-input-group">
          <label htmlFor="companyName">Company Name</label>
          <input
            type="text"
            name="companyName"
            id="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="job-post-input-group">
          <label htmlFor="companyAddress">Company Address</label>
          <input
            type="text"
            name="companyAddress"
            id="companyAddress"
            value={formData.companyAddress}
            onChange={handleInputChange}
          />
        </div>

        <div className="job-post-input-group">
          <label htmlFor="contactDetails">Contact Details</label>
          <input
            type="text"
            name="contactDetails"
            id="contactDetails"
            value={formData.contactDetails}
            onChange={handleInputChange}
          />
        </div>

        <div className="job-post-input-group">
          <label htmlFor="applicationInstructions">Application Instructions</label>
          <textarea
            name="applicationInstructions"
            id="applicationInstructions"
            value={formData.applicationInstructions}
            onChange={handleInputChange}
          />
        </div>

        <div className="job-post-input-group">
          <label htmlFor="perks">Perks</label>
          <input
            type="text"
            name="perks"
            id="perks"
            value={formData.perks}
            onChange={handleInputChange}
          />
        </div>

        <div className="job-post-input-group">
          <label htmlFor="category">Job Category</label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleInputChange}
          />
        </div>

        <div className="job-post-input-group">
          <label htmlFor="logo">Upload Company Logo</label>
          <input
            type="file"
            name="logo"
            id="logo"
            onChange={handleFileUpload}
          />
        </div>

        <div className="job-post-checkbox-container">
          <input
            type="checkbox"
            name="termsAccepted"
            id="termsAccepted"
            checked={formData.termsAccepted}
            onChange={handleCheckboxChange}
            required
          />
          <label htmlFor="termsAccepted">I agree to the terms and conditions</label>
        </div>

        <button type="submit" className="job-post-submit-btn">
          Post Job
        </button>
      </form>
    </div>
  );
};

export default PostJob;
