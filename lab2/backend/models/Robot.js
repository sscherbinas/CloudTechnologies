const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Robot = sequelize.define("robot", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  code: {
    type: DataTypes.INTEGER
  },
  time: {
    type: DataTypes.STRING
  },
  trajectory: {
    type: DataTypes.STRING
  }
});

module.exports = Robot;
