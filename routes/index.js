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
const { Subject, Topic, SubTopic } = require("../models/index");
const { Model } = require("sequelize");

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return day + " " + month + " " + year;
}

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
  res.render("./admin/home", { title: "Dashboard" });
});
router.get("/admin/uploadmateri", function (req, res, next) {
  res.render("./admin/uploadmaterial", { title: "Upload" });
});
router.get("/admin/material", checkRole("admin"), async (req, res, next) => {
  try {
    const subtopics = await SubTopic.findAll({
      include: [
        {
          model: Topic,
          include: [
            {
              model: Subject,
            },
          ],
        },
      ],
    });

    res.render("./admin/listmaterial", {
      subtopics,
      formatDate,
      title: "List Subject",
    });
  } catch (error) {
    next(error);
  }
});
router.post("/uploadmateri", checkRole("admin"), admin.uploadMaterial);
router.get("/student/profile", function (req, res, next) {
  res.render("./student/profile", { title: "Profile" });
});
router.get("/teacher/register", function (req, res, next) {
  res.render("./teacher/register", { title: "Register" });
});
router.get("/admin/upload", function (req, res, next) {
  res.render("./admin/uploadmaterial", { title: "Upload Material" });
});
router.get("/admin/material", function (req, res, next) {
  res.render("./admin/listmaterial", { title: "List Material" });
});

router.post("/", auth.login);
router.post("/logout", auth.logout);
router.post("/studentRegis", auth.registerSiswa);
router.post("/teacherRegis", upload.single("cv"), auth.registerTeacher);

module.exports = router;
