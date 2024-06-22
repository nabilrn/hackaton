const jwt = require("jsonwebtoken");
const dotenv = require("dotenv").config();

function redirectIfLoggedIn(req, res, next) {
  const token = req.cookies.accessToken;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const role = decoded.role;

      switch (role) {
        case "admin":
          res.redirect("/admin/dashboard");
          break;
        case "guru":
          res.redirect("/beranda");
          break;
        case "siswa":
          res.redirect("/home");
          break;
        default:
          next();
      }
    } catch (err) {
      next();
    }
  } else {
    next();
  }
}

module.exports = redirectIfLoggedIn;
