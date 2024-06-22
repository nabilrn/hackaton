const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("../controller/auth");
const siswa = require("../controller/siswa");
const guru = require("../controller/guru");
const admin = require("../controller/admin");
const upload = require("../middleware/uploadFile");
const verif = require("../middleware/verifyToken");

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
router.get("/login", function (req, res, next) {
  res.render("login", { title: "Login" });
});
router.get("/student/register", function (req, res, next) {
  res.render("./student/register", { title: "Register" });
});
router.get("/teacher/register", function (req, res, next) {
  res.render("./teacher/register", { title: "Register" });
});
router.post("/login", auth.login);
router.post("/studentRegis", auth.registerSiswa);
router.post("/teacherRegis", upload.single("cv"), auth.registerTeacher);

module.exports = router;
