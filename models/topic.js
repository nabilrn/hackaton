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
      Topic.belongsTo(models.Material, {
        foreignKey: "idMaterial",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Topic.hasMany(models.SubTopic, {
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
      idMaterial: {
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
