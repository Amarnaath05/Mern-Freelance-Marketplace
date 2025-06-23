import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["full-time", "part-time", "contract", "internship", "freelance"],
    required: true,
  },
  location: {
    type: String,
  },
  minSalary: {
    type: Number,
  },
  maxSalary: {
    type: Number,
  },
  requiredSkills: {
    type: [String],
    default: [],
  },
  experience: {
    type: String,
    enum: ["junior", "mid-level", "senior"],
    default: "junior",
  },
  duration: {
    type: String,
  },
  companyName: {
    type: String,
  },
  companyAddress: {
    type: String,
  },
  contactDetails: {
    type: String,
  },
  applicationInstructions: {
    type: String,
  },
  logo: {
    type: String, // Store filename or full image URL
  },
  termsAccepted: {
    type: Boolean,
    default: false,
  },
  perks: {
    type: String,
  },
  category: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

// ✅ Add virtual field for postedAt
jobSchema.virtual("postedAt").get(function () {
  return this.createdAt;
});

// ✅ Enable virtuals in responses
jobSchema.set("toJSON", { virtuals: true });
jobSchema.set("toObject", { virtuals: true });

export default mongoose.model("Job", jobSchema);
