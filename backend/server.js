import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import todorouter from "./router/todorouter.js"; 

import errorHandler from "./middleware/errorMiddleware.js";

dotenv.config();   
connectDB();

const app = express();

app.use(express.json());

// Routes
app.use("/api", todorouter);

app.use(errorHandler);


app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
