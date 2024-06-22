const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const login = require("../controller/auth");
const siswa = require("../controller/siswa");
const guru = require("../controller/guru");
const admin = require("../controller/admin");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login" });
});
router.get("/student/register", function (req, res, next) {
  res.render("./student/register", { title: "Register" });
});
router.get("/student/home", function (req, res, next) {
  res.render("./student/home", { title: "Home" });
});
router.get("/student/course/sma", function (req, res, next) {
  res.render("./student/sma", { title: "Course Sma" });
});
router.get("/teacher/register", function (req, res, next) {
  res.render("./teacher/register", { title: "Register" });
});
router.get("/admin/dashboard", function (req, res, next) {
  res.render("./admin/home", { title: "Dashboard" });
});
router.get("/admin/upload", function (req, res, next) {
  res.render("./admin/uploadmaterial", { title: "Upload Material" });
});

module.exports = router;
