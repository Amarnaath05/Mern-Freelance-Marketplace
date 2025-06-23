import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/jobs';

// ✅ Get all jobs
export const getJobs = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch jobs:', error?.response?.data?.message || error.message);
    throw error?.response?.data || { message: "An unknown error occurred while fetching jobs" };
  }
};

// ✅ Get a single job by ID
export const getJobById = async (jobId) => {
  try {
    const response = await axios.get(`${API_URL}/${jobId}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch job:', error?.response?.data?.message || error.message);
    throw error?.response?.data || { message: "An unknown error occurred while fetching the job" };
  }
};

// ✅ Post a new job (now accepts token for auth and sends headers)
export const postJob = async (jobData, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/post`,
      jobData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to post job:', error?.response?.data?.message || error.message);
    throw error?.response?.data || { message: "An unknown error occurred while posting the job" };
  }
};

// ✅ Apply to a job (requires token)
export const applyToJob = async (jobId, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/${jobId}/apply`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Failed to apply for job:', error?.response?.data?.message || error.message);
    throw error?.response?.data || { message: "An unknown error occurred while applying for the job" };
  }
};
