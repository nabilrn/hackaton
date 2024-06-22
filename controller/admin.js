const { Subject, Topic, SubTopic } = require("../models/index");
const isPDF = (file) => {
  return file.mimetype === "application/pdf";
};
const isImage = (file) => {
  return file.mimetype === "image/jpeg" || file.mimetype === "image/png";
};
exports.uploadMaterial = async (req, res) => {
  try {
    const {
      name,
      kelas,
      title1,
      title2,
      title3,
      title4,
      title5,
      title6,
      title7,
    } = req.body;
    const subject = await Subject.create({
      name: name,
      kelas: kelas,
    });
    const topic = await Topic.create({
      idSubject: subject.id,
      title: title1,
    });
    if (title2) {
      await SubTopic.create({
        idTopic: topic.id,
        title: title2,
      });
    }
    if (title3) {
      await SubTopic.create({
        idTopic: topic.id,
        title: title3,
      });
    }
    if (title4) {
      await SubTopic.create({
        idTopic: topic.id,
        title: title4,
      });
    }
    if (title5) {
      await SubTopic.create({
        idTopic: topic.id,
        title: title5,
      });
    }
    if (title6) {
      await SubTopic.create({
        idTopic: topic.id,
        title: title6,
      });
    }
    if (title7) {
      await SubTopic.create({
        idTopic: topic.id,
        title: title7,
      });
    }

    res.status(201).json({
      message: "Subject created successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};

exports.editDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { content, video } = req.body;
    const file =
      req.files["file"] && isPDF(req.files["file"][0])
        ? req.files["file"][0].filename
        : null;
    const picture =
      req.files["picture"] && isImage(req.files["picture"][0])
        ? req.files["picture"][0].filename
        : null;

    console.log("file", file);
    console.log("picture", picture);
    console.log("content", content);
    console.log("video", video);
    console.log("id", id);
    await SubTopic.update(
      {
        content: content,
        video: video,
        file: file,
        picture: picture,
      },
      {
        where: {
          id: id,
        },
      }
    );
    res.status(200).json({
      message: "Subject updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
