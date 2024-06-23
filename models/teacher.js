"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Teacher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Teacher.hasOne(models.User, {
        foreignKey: "idTeacher",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Teacher.hasMany(models.Meeting, {
        foreignKey: "idTeacher",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Teacher.hasOne(models.Subject, {
        foreignKey: "idTeacher",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Teacher.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      cv: {
        type: DataTypes.STRING,
      },
      phone: {
        type: DataTypes.STRING,
      },
      address: {
        type: DataTypes.STRING,
      },
      speciality: {
        type: DataTypes.STRING,
      },
      bankAccount: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.ENUM("request", "reject", "accept"),
      },
    },
    {
      sequelize,
      modelName: "Teacher",
    }
  );
  return Teacher;
};
