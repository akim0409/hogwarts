const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Wizard = require("./db/models/Wizard");
const House = require("./db/models/House");
const association = require("./db/models/associations");
const wizardController = require("./controllers/wizard-controller");
const houseController = require("./controllers/house-controller");
const sessionMiddleware = require("./middleware/session-middleware");

const app = express();
const port = 3001;

app.use(
  cors({ // IMPORTANT these options are needed for cookies
    credentials: true,
    origin: true,
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/wizards", wizardController.getWizards);
app.get("/wizards/:wizardId", sessionMiddleware.applySession, wizardController.getWizardById);
app.put("/wizards/:wizardId", sessionMiddleware.applySession, wizardController.updateWizardById);
app.post("/wizards", wizardController.createWizard);
app.post("/wizards/friends/:friendWizardId", sessionMiddleware.applySession, wizardController.makeTwoWizardsFriends)
app.post("/wizards/session", wizardController.createSession);

app.get("/houses", houseController.getHouses);
app.get("/houses/:houseId", houseController.getHouseById);

app.listen(port, () => {
  console.log(`Hogwarts app listening on port ${port}`);
});
