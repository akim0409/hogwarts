import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "./services";

const WizardList = () => {
  const [wizards, setWizards] = useState([]);
  const navigate = useNavigate();

  const fetchWizards = async () => {
    const response = await apiFetch({
      path: '/wizards',
      method: 'GET'
    });
    const data = await response.json();
    setWizards(data);
  }

  useEffect(() => {
    fetchWizards();
  }, [])

  const wizardItems = wizards.map(wizard => {
    return <div 
    key={wizard.id}
    className="flex font-adamina cursor-pointer"
    onClick={() => {
      navigate(`/wizards/${wizard.id}`)
    }}
    >
      <div className="my-1 mx-1">{wizard.firstName}</div>
      <div className="my-1 mr-2">{wizard.lastName}</div>
    </div>
  }) 

  return (
    <div className="h-screen bg-amber-100 flex flex-col items-center p-14">
      <div className="text-5xl font-meta text-red-700">
        Wizards : 
      </div>
      {wizardItems}
    </div>
  )
};

export default WizardList;