const { Material, Topic, SubTopic } = require("../models/index");

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
    const material = await Material.create({
      name: name,
      kelas: kelas,
    });
    const topic = await Topic.create({
      idMaterial: material.id,
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
      message: "Material created successfully",
    });
  } catch (err) {
    res.status(500).json({
      status: "failed",
      message: err.message,
    });
  }
};
