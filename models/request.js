"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Request extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Request.belongsTo(models.User, {
        foreignKey: "idUser",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Request.belongsTo(models.Subject, {
        foreignKey: "idSubject",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Request.belongsTo(models.Topic, {
        foreignKey: "idTopic",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
      Request.belongsTo(models.SubTopic, {
        foreignKey: "idSubTopic",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Request.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      idUser: {
        type: DataTypes.INTEGER,
      },
      idSubject: {
        type: DataTypes.INTEGER,
      },
      idTopic: {
        type: DataTypes.INTEGER,
      },
      idSubTopic: {
        type: DataTypes.INTEGER,
      },
      status: {
        type: DataTypes.ENUM("request", "reject", "accept"),
      },
    },
    {
      sequelize,
      modelName: "Request",
    }
  );
  return Request;
};
