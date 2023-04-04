backend endpoints

GET /wizards
  returns all wizards

GET /wizards/:wizardId
  returns given wizard

POST /wizards
  create a wizard
  
POST /wizards/:wizardId/friends    body {otherWizardId}
  make two wizards friends

GET /houses/
  returns all houses

GET /houses/:houseId
  returns a given house and all wizards in that house



frontend routes

/houses
  display all houses

/house/:houseId
  display house and wizards in that house

/wizards
  display all wizards

/wizard/new
  display form to create a new wizard
  
/wizards/:wizardId
  display wizard, their house, and all their friends


  

Middleware folder!