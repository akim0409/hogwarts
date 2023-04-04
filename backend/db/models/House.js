const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const House = sequelize.define('House', {
  name: DataTypes.STRING,
  animal: DataTypes.STRING,
  color: DataTypes.STRING
})


sequelize.sync();
module.exports = House;