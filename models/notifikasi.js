"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Notifikasi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Notifikasi.belongsTo(models.User, {
        foreignKey: "pengirim",
        as: "user",
      });
    }
  }
  Notifikasi.init(
    {
      penerima: {
        type: DataTypes.INTEGER,
      },
      pengirim: {
        type: DataTypes.STRING,
      },
      judul: {
        type: DataTypes.STRING,
      },
      isi: {
        type: DataTypes.STRING,
      },
      tanggal: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "Notifikasi",
    }
  );
  return Notifikasi;
};
