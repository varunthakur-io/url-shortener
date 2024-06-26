// Import required modules
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const staticRoute = require("./routes/staticRoutes");
const userRoute = require("./routes/userRoutes");
const urlRoute = require("./routes/urlRoutes");
const cookieParser = require("cookie-parser");

// Create Express app
const app = express();

// Define middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs"); // Set EJS as the view engine

// Set up static files serving
app.use(express.static("./public"));

// Connect to MongoDB
mongoose
  .connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Define routes
app.use("/", staticRoute);
app.use("/user", userRoute);
app.use("/url", urlRoute);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
