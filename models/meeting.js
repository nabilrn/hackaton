"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Meeting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Meeting.belongsTo(models.Teacher, {
        foreignKey: "idTeacher",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Meeting.belongsTo(models.User, {
        foreignKey: "idUser",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Meeting.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      tanggal: {
        type: DataTypes.DATE,
      },
      jam: {
        type: DataTypes.STRING,
      },
      link: {
        type: DataTypes.STRING,
      },
      idTeacher: {
        type: DataTypes.INTEGER,
      },
      idUser: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Meeting",
    }
  );
  return Meeting;
};
