const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();
const multer = require("multer");
const { User, Teacher } = require("../models/index");

function isPDF(file) {
  const allowedExtensions = /(\.pdf)$/i;
  return allowedExtensions.test(file.originalname);
}

exports.login = async (req, res) => {
  try {
    const pengguna = await User.findOne({
      where: { email: req.body.email },
    });
    if (!pengguna) {
      return res.json({ msg: "email atau Password Salah" });
    }
    const match = await bcrypt.compare(req.body.password, pengguna.password);

    if (req.body.password === "" || req.body.email === "") {
      res.json({ msg: "Email atau password tidak valid" });
    }

    if (!match) {
      return res.json({ msg: "email atau Password Salah" });
    }
    if (match) {
      const userId = pengguna.id;
      const role = pengguna.role;
      const accessToken = jwt.sign(
        { userId, email: pengguna.email, role },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      const refreshToken = jwt.sign(
        { userId, email: pengguna.email, role },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      switch (role) {
        case "siswa":
          res.render("student/home", {
            accessToken,
            pengguna,
            title: "Home",
          });
          break;
        case "guru":
          res.render("teacher/home", {
            accessToken,
            pengguna,
            title: "Home",
          });
          break;
        case "admin":
          res.render("admin/home", {
            accessToken,
            pengguna,
            title: "Dashboard",
          });
          break;
        default:
          res.status(401).json({ msg: "Invalid role" });
      }
    } else {
      return res.status(401).json({ status: "error", msg: "Login failed" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

exports.registerSiswa = async (req, res) => {
  const { name, email, password, passwordLagi } = req.body;
  if (!name || !email || !password || !passwordLagi) {
    return res.status(400).json({ message: "Semua Bidang harus Diisi" });
  }

  const user = await User.findAll();
  const cekEmail = user.find((user) => user.email === email);
  if (cekEmail) {
    return res.status(400).json({ message: "email sudah terdaftar" });
  }

  if (password !== passwordLagi) {
    return res
      .status(400)
      .json({ message: "Konfirmasi password tidak sesuai" });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);
    await User.create({
      email: email,
      name: name,
      password: hashPass,
      role: "siswa",
    });

    res.json({ msg: "Registrasi berhasil" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Registrasi gagal, coba lagi nanti" });
  }
};

exports.registerTeacher = async (req, res) => {
  const {
    name,
    email,
    password,
    passwordLagi,
    phone,
    address,
    speciality,
    bankAccount,
  } = req.body;

  const cv = req.file && isPDF(req.file) ? req.file.filename : null;

  console.log("cv", cv);

  if (
    !name ||
    !email ||
    !password ||
    !passwordLagi ||
    !phone ||
    !address ||
    !speciality ||
    !cv ||
    !bankAccount
  ) {
    return res.status(400).json({ message: "Semua Bidang harus Diisi" });
  }

  const user = await User.findAll();
  const cekEmail = user.find((user) => user.email === email);
  if (cekEmail) {
    return res.status(400).json({ message: "email sudah terdaftar" });
  }

  if (password !== passwordLagi) {
    return res
      .status(400)
      .json({ message: "Konfirmasi password tidak sesuai" });
  }

  try {
    const salt = await bcrypt.genSalt();
    const hashPass = await bcrypt.hash(password, salt);
    const newTeacher = await Teacher.create({
      cv: cv,
      phone: phone,
      address: address,
      speciality: speciality,
    });

    // Use the id from the newTeacher instance
    await User.create({
      idTeacher: newTeacher.id, // Correctly reference the id of the new teacher
      name: name,
      email: email,
      password: hashPass,
      role: "guru",
    });

    res.json({ msg: "Registrasi berhasil" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Registrasi gagal, coba lagi nanti" });
  }
};

exports.logout = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) return res.status(204).json({ msg: "NO CONTENT" });
  res.clearCookie("refreshToken");
  res.clearCookie("accessToken");
  res.redirect("/login");
};
