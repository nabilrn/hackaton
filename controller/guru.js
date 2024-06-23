const { where } = require("sequelize");
const { Teacher, User, Subject, Topic, SubTopic } = require("../models/index");

const isPDF = (file) => {
  return file.mimetype === "application/pdf";
};

exports.uploadHal = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findByPk(userId);
    const guru = await Teacher.findAll({
      where: { id: user.idTeacher },
      include: [
        {
          model: Subject,
          attributes: ["name", "kelas"],
          where: { idTeacher: user.idTeacher },
        },
      ],
    });
    res.render("./teacher/uploadmaterial", { guru, title: "Upload" });
  } catch (error) {
    console.log(error);
  }
};

exports.uploadMaterial = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findByPk(userId);
    const guru = await Teacher.findOne({
      where: { id: user.idTeacher },
    });
    const { name, title, kelas, content, video } = req.body;
    const file =
      req.files["file"] && isPDF(req.files["file"][0])
        ? req.files["file"][0].filename
        : null;

    console.log("file", file);
    console.log("hehe ", req.body);
    const subject = await Subject.create({
      idTeacher: guru.id,
      name: name,
      kelas: kelas,
    });
    const topic = await Topic.create({
      idSubject: subject.id,
      title: title,
    });
    await SubTopic.create({
      idTopic: topic.id,
      content: content,
      video: video,
      file: file,
    });
    res.json({ msg: "Request berhasil" });
  } catch (error) {
    console.log("ERROR", error);
  }
};
