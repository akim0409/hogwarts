const Wizard = require('../models/Wizard');
const House = require('../models/House');
const associations = require('../models/associations');

const runSeeds = async () => {
  await Wizard.sync({ force: true});
  await House.sync({ force: true });

  const harryPotter = await Wizard.create({
    firstName: 'Harry',
    lastName: 'Potter',
    nationality: 'English',
    username: 'harrypotter',
    password: 'hpotter'
  });

  const minervaMcGonagall = await Wizard.create({
    firstName: 'Minerva',
    lastName: 'McGonagall',
    nationality: 'English',
    username: 'minerva',
    password: 'mmcgonagall'
  });

  const dracoMalfoy = await Wizard.create({
    firstName: 'Draco',
    lastName: 'Malfoy',
    nationality: 'English',
    username: 'dracomalfoy',
    password: 'dmalfoy'
  })

  const gryffindor = await House.create({
    name: 'Gryffindor',
    animal: 'Lion',
    color: 'red'
  });

  const ravenclaw = await House.create({
    name: 'Ravenclaw',
    animal: 'Eagle',
    color: 'blue'
  });

  const hufflepuff = await House.create({
    name: 'Hufflepuff',
    animal: 'Badger',
    color: 'yellow'
  });

  const slytherin = await House.create({
    name: 'Slytherin',
    animal: 'Serpent',
    color: 'green'
  });

  await gryffindor.addWizard(harryPotter);
  await minervaMcGonagall.setHouse(gryffindor);

  await dracoMalfoy.setHouse(slytherin);

  await harryPotter.addFriend(dracoMalfoy);
  await dracoMalfoy.addFriend(harryPotter);


  // const allWizards = await Wizard.findAll({ raw: true });
  // const allHouses = await House.findAll({ raw: true });
  // console.table(allWizards);
  // console.table(allHouses);

  // console.log('griffindor wizards:');
  // console.log(await gryffindor.getWizards({raw: true}));
  
  // console.log(' harry friends :');
  // console.log(await harryPotter.getFriends({raw: true}));
  // console.log(await dracoMalfoy.getFriends({raw: true}));


  
  // console.log(await harryPotter.countFriends());


};

runSeeds();