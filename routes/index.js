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
const {
  Subject,
  Topic,
  SubTopic,
  Teacher,
  User,
  Request,
} = require("../models/index");
const { where } = require("sequelize");

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
router.get("/admin/dashboard", checkRole("admin"), function (req, res, next) {
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
router.get("/editcontent/:id", checkRole("admin"), async (req, res, next) => {
  try {
    const idSubtopic = req.params.id;
    const subtopic = await SubTopic.findOne({
      where: {
        id: idSubtopic,
      },
    });

    res.render("./admin/editcontent", {
      subtopic,
      formatDate,
      title: "Edit Content",
    });
  } catch (error) {
    next(error);
  }
});
router.post("/uploadmateri", checkRole("admin"), admin.uploadMaterial);
router.post(
  "/editDetail/:id",
  checkRole("admin"),
  upload.fields([
    { name: "file", maxCount: 1 },
    { name: "picture", maxCount: 1 },
  ]),
  admin.editDetail
);

router.get("/teacher/register", function (req, res, next) {
  res.render("./teacher/register", { title: "Register" });
});
router.get("/admin/upload", function (req, res, next) {
  res.render("./admin/uploadmaterial", { title: "Upload Material" });
});
router.get("/admin/material", function (req, res, next) {
  res.render("./admin/listmaterial", { title: "List Material" });
});
router.get("/admin/teacher", async (req, res, next) => {
  try {
    const teachers = await Teacher.findAll({
      include: [
        {
          model: User,
        },
      ],
    });
    res.render("./admin/listteacher", { teachers, title: "List Teacher" });
  } catch (error) {
    next(error);
  }
});
router.get("/admin/addmeeting/:id", async (req, res, next) => {
  try {
    const idTeacher = req.params.id;
    const teachers = await Teacher.findOne({
      where: {
        id: idTeacher,
      },
      include: [
        {
          model: User,
        },
      ],
    });
    res.render("./admin/editteacher", { teachers, title: "Edit Teacher" });
  } catch (error) {
    next(error);
  }
});
router.post("/addMeeting/:id", checkRole("admin"), admin.addMeeting);
router.get("/admin/make_schedule", async (req, res, next) => {
  try {
    const teachers = await Teacher.findAll({
      where: { status: "accept" },
      include: [
        {
          model: User,
        },
      ],
    });
    res.render("./admin/makeschedule", { teachers, title: "Make Schedule" });
  } catch (error) {
    next(error);
  }
});
router.post("/addschedule", checkRole("admin"), admin.makeSchedule);
router.get("/admin/request", async (req, res, next) => {
  try {
    const request = await Request.findAll({
      include: [
        {
          model: User,
          model: SubTopic,
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
        },
      ],
    });

    res.render("./admin/request", { request, title: "Request" });
  } catch (error) {
    next(error);
  }
});
router.get("/student/material/shs", function (req, res, next) {
  res.render("./student/sma", { title: "SHS Material" });
});
router.get("/student/material/jhs", function (req, res, next) {
  res.render("./student/smp", { title: "JHS Material" });
});
router.get("/student/material/ems", function (req, res, next) {
  res.render("./student/sd", { title: "EMS Material" });
});
router.get("/student/topics", function (req, res, next) {
  res.render("./student/topics", { title: "Topics" });
});
router.get("/student/topics/detail", function (req, res, next) {
  res.render("./student/topicsdetail", { title: "Topics Details" });
});
router.get("/student/request", function (req, res, next) {
  res.render("./student/request", { title: "Request For Meeting" });
});

router.post("/", auth.login);
router.post("/logout", auth.logout);
router.post("/studentRegis", auth.registerSiswa);
router.post("/teacherRegis", upload.single("cv"), auth.registerTeacher);

module.exports = router;
