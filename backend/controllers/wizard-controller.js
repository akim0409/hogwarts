const Wizard = require ("../db/models/Wizard");
const association = require("../db/models/associations");

const getWizards = async (req, res) => {
  const wizards = await Wizard.findAll();
  res.status(200).json(wizards);
};

const getWizardById = async (req, res) => {
  const wizard = await Wizard.findOne({
    where: { id: req.params.wizardId },
  });

  if (wizard) {
    const house = await wizard.getHouse();
    const friends = await wizard.getFriends();
    const isFriend = await wizard.hasFriend(req.user);
    res.status(200).json({
      wizard,
      house,
      friends,
      isFriend,
    });
  } else {
    res.status(404).json({ message: "Wizard not found" });
  }
};

const updateWizardById = async (req, res) => {
  if (!req.user) {
    res.status(401).json({ message: "Not authorized to update" });
    return;
  }

  const wizardFromParam = await Wizard.findOne({
    where: { id: req.params.wizardId },
  });

  if (req.user.id === wizardFromParam.id) {
    const wizard = await Wizard.update(req.body, {
      where: { id: req.params.wizardId },
    });

    res.status(200).json(wizard);
  } else {
    res.status(401).json({ message: "Not authorized to update" });
  }
};

const createWizard = async (req, res) => {
  await Wizard.create(req.body);
  res.status(201).json({ message: "Wizard created" });
};

const makeTwoWizardsFriends = async (req, res) => {
  const possibleFriendWizard = await Wizard.findOne({ where: { id: req.params.friendWizardId } });

  if (req.user && possibleFriendWizard) {
    await req.user.addFriend(possibleFriendWizard);
    await possibleFriendWizard.addFriend(req.user);
    res
      .status(200)
      .json({
        message: `Wizard id: ${req.user.id} and Wizard id: ${possibleFriendWizard.id} are friends now`,
      });
  } else {
    res.status(404).json({ message: "Wizard not found" });
  }
};
 
const createSession = async (req, res) => {
  const wizard = await Wizard.findOne({
    where: { username: req.body.username },
  });

  if (wizard === null || wizard.password !== req.body.password) {
    res.status(401).json({ message: "username or password is incorrect" });
  } else {
    // IMPORTANT setting cookies
    // https://expressjs.com/en/4x/api.html#res.cookie
    res
      .status(200)
      .cookie("username", wizard.username)
      .json({ message: "Sign in successful" });
  }
};


module.exports = {
  getWizards,
  getWizardById,
  updateWizardById,
  createWizard,
  makeTwoWizardsFriends,
  createSession
};