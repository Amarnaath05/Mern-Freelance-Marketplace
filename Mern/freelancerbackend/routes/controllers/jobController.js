import multer from "multer";
import path from "path";
import Job from "../models/Job.js";

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif/;
  const isValid =
    allowedTypes.test(path.extname(file.originalname).toLowerCase()) &&
    allowedTypes.test(file.mimetype);
  if (isValid) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"));
  }
};

const upload = multer({ storage, fileFilter });

export const uploadLogo = upload.single("logo");

// POST a new job
export const postJob = async (req, res) => {
  try {
    const uploadedFile = req.file;

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
      termsAccepted,
      perks,
      category,
    } = req.body;

    if (!title || !description || !location || !companyName || termsAccepted !== "true") {
      return res.status(400).json({ message: "Please fill all required fields and accept terms" });
    }

    const logo = uploadedFile ? uploadedFile.filename : null;

    const skillsArray =
      typeof requiredSkills === "string"
        ? requiredSkills.split(",").map((skill) => skill.trim())
        : requiredSkills;

    const newJob = new Job({
      title,
      description,
      type,
      location,
      minSalary,
      maxSalary,
      requiredSkills: skillsArray,
      experience,
      duration,
      companyName,
      companyAddress,
      contactDetails,
      applicationInstructions,
      logo,
      termsAccepted: termsAccepted === "true",
      perks,
      category,
    });

    await newJob.save();

    res.status(201).json({
      message: "Job posted successfully",
      job: newJob,
    });
  } catch (err) {
    console.error("Error posting job:", err.message);
    res.status(500).json({ message: "Failed to post job", error: err.message });
  }
};

// GET all jobs
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    console.error("Error fetching jobs:", err.message);
    res.status(500).json({ message: "Failed to fetch jobs", error: err.message });
  }
};

// GET job by ID
export const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(job);
  } catch (err) {
    console.error("Error fetching job by ID:", err.message);
    res.status(500).json({ message: "Failed to fetch job", error: err.message });
  }
};

// PUT update job by ID
export const updateJob = async (req, res) => {
  try {
    const updatedJob = await Job.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedJob) return res.status(404).json({ message: "Job not found" });
    res.status(200).json(updatedJob);
  } catch (err) {
    console.error("Error updating job:", err.message);
    res.status(500).json({ message: "Failed to update job", error: err.message });
  }
};

// DELETE job by ID
export const deleteJob = async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);
    if (!deletedJob) return res.status(404).json({ message: "Job not found" });
    res.status(200).json({ message: "Job deleted successfully" });
  } catch (err) {
    console.error("Error deleting job:", err.message);
    res.status(500).json({ message: "Failed to delete job", error: err.message });
  }
};
