// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const indexRoutes = require("./routes/index");

// Create Express app
const app = express();

// Define middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs'); // Set EJS as the view engine

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost/url-shortener")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

// Define routes
app.use("/", indexRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
