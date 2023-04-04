const Wizard = require("../db/models/Wizard");

const applySession = async (req, res, next) => {
  if (req.cookies.username) {
    req.user = await Wizard.findOne({
      where: { username: req.cookies.username },
    });
  } else {
    req.user = null;
  }
  next();
};

module.exports = {
  applySession
};