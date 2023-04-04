const House = require("../db/models/House");
const association = require("../db/models/associations");

const getHouses = async (req, res) => {
  const houses = await House.findAll();
  res.status(200).json(houses);
};

const getHouseById = async (req, res) => {
  const house = await House.findOne({
    where: { id: req.params.houseId },
  });

  if (house) {
    const wizards = await house.getWizards();
    res.status(200).json({
      house,
      wizards,
    });
  } else {
    res.status(404).json({ message: "House not found" });
  }
};

module.exports = {
  getHouses,
  getHouseById
}