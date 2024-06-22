const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../controller/auth");
const siswa = require("../controller/siswa");
const guru = require("../controller/guru");
const admin = require("../controller/admin");
const upload = require("../middleware/uploadFile");
const verif = require("../middleware/verifyToken");
const redirectIfLoggedIn = require("../middleware/loggedIn");
const checkRole = require("../middleware/checkRole");

router.get("/", redirectIfLoggedIn, function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/login", redirectIfLoggedIn, function (req, res, next) {
  res.render("login", { title: "Login" });
});
router.get("/student/register", function (req, res, next) {
  res.render("./student/register", { title: "Register" });
});
router.get("/home", checkRole("siswa"), function (req, res, next) {
  res.render("./student/home", { title: "Home" });
});
router.get("/beranda", checkRole("guru"), function (req, res, next) {
  res.render("./teacher/home", { title: "Home" });
});
router.get("/dashboard", checkRole("admin"), function (req, res, next) {
  res.render("./admin/dashboard", { title: "Dashboard" });
});
router.get("/student/profile", function (req, res, next) {
  res.render("./student/profile", { title: "Profile" });
});
router.get("/teacher/register", function (req, res, next) {
  res.render("./teacher/register", { title: "Register" });
});
router.post("/", auth.login);
router.post("/logout", auth.logout);
router.post("/studentRegis", auth.registerSiswa);
router.post("/teacherRegis", upload.single("cv"), auth.registerTeacher);

module.exports = router;
