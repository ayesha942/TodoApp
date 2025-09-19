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
    createdBy: {
      type: String, 
    },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
