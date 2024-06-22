"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SubTopic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SubTopic.belongsTo(models.Topic, {
        foreignKey: "idTopic",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      SubTopic.hasMany(models.Request, {
        foreignKey: "idSubTopic",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  SubTopic.init(
    {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      idTopic: {
        type: DataTypes.INTEGER,
      },
      title: {
        type: DataTypes.STRING,
      },
      content: {
        type: DataTypes.TEXT,
      },
      video: {
        type: DataTypes.STRING,
      },
      picture: {
        type: DataTypes.STRING,
      },
      file: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "SubTopic",
    }
  );
  return SubTopic;
};
