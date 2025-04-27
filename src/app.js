const express = require('express');
const path = require('path');
const hbs = require('hbs');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 80;

// path of public directory
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));

// API endpoint to provide the API key
app.get("/api/config", (req, res) => {
  res.json({
    apiKey: process.env.OPENWEATHER_API_KEY
  });
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/weather", (req, res) => {
  res.render("weather");
});

app.get("*", (req, res) => {
  res.render("404err", {
    errorMsg: "Oops! Page Not Found",
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});