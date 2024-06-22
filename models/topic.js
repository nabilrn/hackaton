"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Topic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Topic.belongsTo(models.Subject, {
        foreignKey: "idSubject",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Topic.hasMany(models.SubTopic, {
        foreignKey: "idTopic",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Topic.hasMany(models.Request, {
        foreignKey: "idTopic",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Topic.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.STRING,
      },
      idSubject: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Topic",
    }
  );
  return Topic;
};
