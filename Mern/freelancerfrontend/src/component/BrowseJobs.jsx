import React, { useState, useEffect } from 'react';
import { getJobs } from '../services/jobServices'; // Fetch jobs from backend
import { format } from 'date-fns'; // ✅ For formatting postedAt
import "../styles/BrowseJobs.css"; // Import CSS

const BrowseJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ category: '', location: '', salary: '' });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await getJobs();
        setJobs(data);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on category, location, and minimum salary
  const filteredJobs = jobs.filter(job => {
    return (
      (filters.category ? job.category === filters.category : true) &&
      (filters.location ? job.location.toLowerCase().includes(filters.location.toLowerCase()) : true) &&
      (filters.salary ? parseInt(job.minSalary) >= parseInt(filters.salary) : true)
    );
  });

  return (
    <div className="browse-jobs-container">
      <h1 className="browse-jobs-title">Browse Jobs</h1>

      {/* Filters */}
      <div className="filter-section">
        <select
          className="filter-input"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        >
          <option value="">Select Category</option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile Development">Mobile Development</option>
          <option value="Design">Design</option>
          {/* Add more categories if needed */}
        </select>

        <input
          type="text"
          className="filter-input"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        />

        <input
          type="number"
          className="filter-input"
          placeholder="Minimum Salary"
          value={filters.salary}
          onChange={(e) => setFilters({ ...filters, salary: e.target.value })}
        />
      </div>

      {/* Job Listings */}
      <div className="job-listings">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => (
            <div className="job-card" key={job._id}>
              <div className="job-title">{job.title}</div>
              <div className="job-category">{job.category}</div>
              <div className="job-location">{job.location}</div>
              <div className="job-salary">
                Salary: ₹{job.minSalary} - ₹{job.maxSalary}
              </div>
              <div className="job-postedAt">
                Posted on: {format(new Date(job.postedAt), 'd MMMM yyyy')}
              </div>
              <button className="view-details-btn">View Details</button>
            </div>
          ))
        ) : (
          <div className="no-jobs-message">No jobs found</div>
        )}
      </div>
    </div>
  );
};

export default BrowseJobs;
