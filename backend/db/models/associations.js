const sequelize = require('../index');
const Wizard = require('../models/Wizard');
const House = require('../models/House');


House.hasMany(Wizard);
Wizard.belongsTo(House);
Wizard.belongsToMany(Wizard, {through: 'Friend', as: 'friends'}); // many-to-many self-association!!!!


sequelize.sync();

// https://sequelize.org/docs/v6/core-concepts/assocs/
// https://sequelize.org/docs/v6/core-concepts/assocs/#creating-the-standard-relationships
// https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances