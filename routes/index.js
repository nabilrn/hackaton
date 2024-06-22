const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const login = require("../controller/auth");
const siswa = require("../controller/siswa");
const guru = require("../controller/guru");
const admin = require("../controller/admin");

router.get("/login", login.page);
router.get("/", login.page);
router.post("/", login.login);

module.exports = router;
