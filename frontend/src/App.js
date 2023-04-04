import { BrowserRouter, Routes, Route } from "react-router-dom";
import HouseList from "./HouseList";
import HouseShowPage from "./HouseShowPage";
import WizardList from "./WizardList";
import WizardShowPage from "./WizardShowPage";
import CreateWizard from "./CreateWizard";
import SignInForm from "./SignInForm";


const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/houses" Component={HouseList}/>
        <Route path="/houses/:houseId" Component={HouseShowPage} />
        <Route path="/wizards" Component={WizardList} />
        <Route path="/wizards/:wizardId" Component={WizardShowPage} />
        <Route path="/wizards/new" Component={CreateWizard} />
        <Route path="/wizards/signin" Component={SignInForm} />
      </Routes>
    </BrowserRouter>
  );
}


// 
export default App;
