const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const Wizard = require("./db/models/Wizard");
const House = require("./db/models/House");
const association = require("./db/models/associations");



const app = express();
const port = 3001;

app.use(cors({
  credentials: true,
  origin: true
}));
app.use(bodyParser.json());
app.use(cookieParser());


app.get("/wizards", async (req, res) => {
  const wizards = await Wizard.findAll();
  console.log(req.cookies);
  res.status(200).json(wizards);
});

app.get("/wizards/:wizardId", async (req, res) => {
  const wizard = await Wizard.findOne({
    where: {id: req.params.wizardId}
  })

  if (wizard) {
    const house = await wizard.getHouse();
    const friends = await wizard.getFriends();
    res.status(200).json({
      wizard, house, friends
    });
  } else {
    res.status(404).json({ message: 'Wizard not found'});
  }
});

app.post("/wizards", async (req, res) => {
  await Wizard.create(req.body);
  res.status(201).json({ message: 'Wizard created'});
})


//POST /wizards/:wizardId/friends    body {otherWizardId}
//make two wizards friends

app.post("/wizards/:wizardId/friends", async (req, res) => {
  const wizardOne = await Wizard.findOne( {where: { id: req.params.wizardId}});
  const wizardTwo = await Wizard.findOne( {where: { id: req.body.wizardId}});

  if (wizardOne && wizardTwo) {
    wizardOne.addFriend(wizardTwo);
    wizardTwo.addFriend(wizardOne);
    res.status(200).json({ message: `Wizard id: ${req.params.wizardId} and Wizard id: ${req.body.wizardId} are friends now`});
  } else {
    res.status(404).json({ message: 'Wizard not found'});
  }
});

// POST /wizards/session body { username, password }

// https://expressjs.com/en/4x/api.html#res.cookie
app.post("/wizards/session", async (req, res) => {
  const wizard = await Wizard.findOne( { where: { username: req.body.username }});

  // if (wizard) {
  //   if (wizard.password === req.body.password) {
  //     res.status(200).json({ message: "Sign in successful"});
  //   } else {
  //     res.status(401).json({ message: "username or password is incorrect"});
  //   }
  // } else {
  //     res.status(401).json({ message: "username or password is incorrect"});
  // }


  if (wizard === null || wizard.password !== req.body.password) {
    res.status(401).json({ message: "username or password is incorrect"});
  } else {
    res.status(200).cookie('foo', 'bar').json({ message: "Sign in successful"});
  }
})


app.get("/houses", async (req, res) => {
  const houses = await House.findAll();
  res.status(200).json(houses);
})

app.get("/houses/:houseId", async (req, res) => {
  const house = await House.findOne({
    where: {id: req.params.houseId}
  });

  if (house) {
    const wizards = await house.getWizards();
    res.status(200).json({
      house,
      wizards
    })
  } else {
    res.status(404).json({ message: 'House not found'});
  }
});




app.listen(port, () => {
  console.log(`Hogwarts app listening on port ${port}`);
});