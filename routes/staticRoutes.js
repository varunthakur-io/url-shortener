// routes/staticRoutes.js
const express = require("express");
const StaticRouter = express.Router();

const URL = require("../models/urlModel");
const restrictToLoggedIn = require("../middlewares/auth");

StaticRouter.get("/", restrictToLoggedIn, async (req, res) => {
  const urls = await URL.find({ createdBy: req.user._id });
  const id = req.query.id;

  return res.render("home", {
    urls: urls,
    id: id,
  });
});

StaticRouter.get("/login", (req, res) => {
  if (req.cookies.session_id) return res.redirect("/");
  return res.render("login");
});

StaticRouter.get("/signup", (req, res) => {
  if (req.cookies.session_id) return res.redirect("/");
  return res.render("signup");
});

StaticRouter.get("/analytics", (req, res) => {
  return res.render("analytics");
});

StaticRouter.get("/test", (req, res) => {
  res.render("test");
});
module.exports = StaticRouter;
