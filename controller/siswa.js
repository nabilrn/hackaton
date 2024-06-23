const {
  User,
  Request,
  Subject,
  Topic,
  SubTopic,
  Notifikasi,
} = require("../models/index");

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

exports.requestClass = async (req, res) => {
  try {
    const idUser = req.userId;
    const { idSubject, idTopic, idSubTopic } = req.body;
    console.log(idUser);
    if (!idSubject || !idTopic || !idSubTopic) {
      return res.json({ msg: "Data tidak lengkap" });
    }
    const request = await Request.create({
      idUser: idUser,
      idSubject: idSubject,
      idTopic: idTopic,
      idSubTopic: idSubTopic,
      status: "request",
    });
    res.json({ msg: "Request berhasil" });
  } catch (error) {
    console.log(error);
  }
};

exports.notifikasi = async (req, res) => {
  try {
    const notif = await Notifikasi.findAll({
      where: { penerima: req.userId },
    });
    res.render("./student/notification", {
      notif,
      formatDate,
      title: "Notifikasi",
    });
  } catch (error) {
    console.error(error);
  }
};
