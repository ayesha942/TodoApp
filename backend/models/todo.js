import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    dueDate: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High'],
      default: 'Low', // ✅ ADD THIS - Set default priority
      required: true,
    },
    createdBy: {
      type: String, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);