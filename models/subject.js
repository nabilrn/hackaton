"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Subject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subject.hasMany(models.Topic, {
        foreignKey: "idSubject",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Subject.hasMany(models.Request, {
        foreignKey: "idSubject",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Subject.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      kelas: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      modelName: "Subject",
    }
  );
  return Subject;
};
