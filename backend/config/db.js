const mongoose = require("mongoose"); //here use require instead of import because mongoose doesn't support ES6 modules by default
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
module.exports = connectDB;