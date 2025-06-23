const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const { verifyToken } = require('../middleware/authMiddleware');

// ✅ POST: Create a new job
router.post('/post', async (req, res) => {
  try {
    const {
      title,
      description,
      type,
      location,
      minSalary,
      maxSalary,
      requiredSkills,
      experience,
      duration,
      companyName,
      companyAddress,
      contactDetails,
      applicationInstructions,
      logo,
      termsAccepted,
      perks,
      category,
    } = req.body;

    // Basic validation
    if (!title || !description || !location || !companyName || termsAccepted !== true) {
      return res.status(400).json({ message: 'Please fill all required fields and accept terms' });
    }

    // Save job to DB
    const job = new Job({
      title,
      description,
      type,
      location,
      minSalary,
      maxSalary,
      requiredSkills: Array.isArray(requiredSkills) ? requiredSkills : (requiredSkills ? [requiredSkills] : []),
      experience,
      duration,
      companyName,
      companyAddress,
      contactDetails,
      applicationInstructions,
      logo,
      termsAccepted,
      perks,
      category,
    });

    const savedJob = await job.save();
    res.status(201).json(savedJob);
  } catch (err) {
    console.error("❌ Error saving job:", err);
    res.status(500).json({ message: 'Failed to post job', error: err.message });
  }
});

// ✅ GET: All jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    const jobsWithPostedAt = jobs.map(job => ({
      ...job._doc,
      postedAt: job.createdAt,
    }));

    res.status(200).json(jobsWithPostedAt);
  } catch (err) {
    console.error("❌ Error fetching jobs:", err);
    res.status(500).json({ message: 'Failed to fetch jobs', error: err.message });
  }
});

// ✅ GET: Single job by ID
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(job);
  } catch (err) {
    console.error("❌ Error fetching job by ID:", err);
    res.status(500).json({ message: 'Failed to fetch job', error: err.message });
  }
});

// ✅ PUT: Update job by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json(updatedJob);
  } catch (err) {
    console.error("❌ Error updating job:", err);
    res.status(500).json({ message: 'Failed to update job', error: err.message });
  }
});

// ✅ DELETE: Delete job by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ message: 'Job not found' });
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error("❌ Error deleting job:", err);
    res.status(500).json({ message: 'Failed to delete job', error: err.message });
  }
});

// ✅ POST: Apply to a job (protected)
router.post('/:id/apply', verifyToken, async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;

    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    if (job.applicants.includes(userId)) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    job.applicants.push(userId);
    await job.save();

    res.status(200).json({ message: 'Applied successfully', job });
  } catch (err) {
    console.error("❌ Error applying to job:", err);
    res.status(500).json({ message: 'Failed to apply', error: err.message });
  }
});

module.exports = router;
