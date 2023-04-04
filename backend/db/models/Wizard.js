const { DataTypes } = require('sequelize');
const sequelize = require('../index');

const Wizard = sequelize.define('Wizard', {
  firstName: DataTypes.STRING,
  lastName: DataTypes.STRING,
  nationality: DataTypes.STRING,
  username: DataTypes.STRING,
  password: DataTypes.STRING
});

sequelize.sync();

module.exports = Wizard;