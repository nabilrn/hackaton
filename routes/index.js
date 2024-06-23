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
  Notifikasi,
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

router.get("/", redirectIfLoggedIn, async (req, res, next) => {
  res.render("index", { title: "Express" });
});
router.get("/login", redirectIfLoggedIn, async (req, res, next) => {
  res.render("login", { title: "Login" });
});
router.get("/student/register", async (req, res, next) => {
  res.render("./student/register", { title: "Register" });
});
router.get("/home", checkRole("siswa"), async (req, res, next) => {
  res.render("./student/home", { title: "Home" });
});
router.get("/beranda", checkRole("guru"), async (req, res, next) => {
  res.render("./teacher/home", { title: "Home" });
});
router.get("/admin/dashboard", checkRole("admin"), async (req, res, next) => {
  res.render("./admin/home", { title: "Dashboard" });
});
router.get("/admin/uploadmateri", async (req, res, next) => {
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

router.get("/teacher/register", async (req, res, next) => {
  res.render("./teacher/register", { title: "Register" });
});
router.get("/admin/upload", async (req, res, next) => {
  res.render("./admin/uploadmaterial", { title: "Upload Material" });
});
router.get(
  "/teacher/upload",
  checkRole("guru"),
  verif.verifyToken,
  guru.uploadHal
);
router.post(
  "/uploadmateri",
  checkRole("guru"),
  verif.verifyToken,
  upload.single("file"),
  guru.uploadMaterial
);
router.get("/admin/material", async (req, res, next) => {
  res.render("./admin/listmaterial", { title: "List Material" });
});
router.get("/teacher/material", async (req, res, next) => {
  res.render("./teacher/listmaterial", { title: "List Material" });
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
router.get("/student/material/shs", async (req, res, next) => {
  try {
    const subject = await Subject.findAll({
      where: { kelas: ["10", "11", "12"] },
    });
    res.render("./student/sma", { title: "SHS Material", subject });
  } catch (error) {
    console.log(error);
  }
});

router.get("/student/material/jhs", async (req, res, next) => {
  try {
    const subject = await Subject.findAll({
      where: { kelas: ["7", "8", "9"] },
    });
    res.render("./student/smp", { title: "JHS Material", subject });
  } catch (error) {
    console.log(error);
  }
});
router.get("/student/material/ems", async (req, res, next) => {
  try {
    const subject = await Subject.findAll({
      where: { kelas: ["1", "2", "3", "4", "5", "6"] },
    });
    res.render("./student/sd", { title: "EMS Material", subject });
  } catch (error) {
    console.log(error);
  }
});
router.get("/student/topics/:id", async (req, res, next) => {
  try {
    const idSubject = req.params.id;
    const subject = await Subject.findOne({ where: { id: idSubject } });
    const topic = await Topic.findAll({
      where: { idSubject: idSubject },
    });
    res.render("./student/topics", { topic, subject, title: "Topics" });
  } catch (error) {
    console.log(error);
  }
});
router.get("/student/topics/detail/:id", async (req, res, next) => {
  try {
    const idTopic = req.params.id;
    const topic = await Topic.findOne({ where: { id: idTopic } });
    const subtopic = await SubTopic.findAll({
      where: { idTopic: idTopic },
    });
    res.render("./student/topicsdetail", { subtopic, topic, title: "Topics" });
  } catch (error) {
    console.log(error);
  }
});
router.get("/student/request", async (req, res, next) => {
  try {
    const subjects = await Subject.findAll({
      include: {
        model: Topic,
        include: SubTopic,
      },
    });
    res.render("./student/request", {
      subjects,
      title: "Request Class",
    });
  } catch (error) {
    console.log(error);
  }
});
router.get(
  "/student/notif",
  checkRole("siswa"),
  verif.verifyToken,
  siswa.notifikasi
);
router.post(
  "/requestkelas",
  checkRole("siswa"),
  verif.verifyToken,
  siswa.requestClass
);

router.post("/", auth.login);
router.post("/logout", auth.logout);
router.post("/studentRegis", auth.registerSiswa);
router.post("/teacherRegis", upload.single("cv"), auth.registerTeacher);

module.exports = router;
