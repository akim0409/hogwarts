import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { apiFetch } from "./services";

const WizardShowPage = () => {
  const [wizard, setWizard] = useState(null);
  const [house, setHouse] = useState(null);
  const [friends, setFriends] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchWizardInformations = async () => {
    const response = await apiFetch({
      path: `/wizards/${params.wizardId}`,
      method: 'GET'
    })
    const data = await response.json();
    setWizard(data.wizard);
    setHouse(data.house);
    setFriends(data.friends);
  };

  useEffect(() => {
    fetchWizardInformations();
  }, [location.pathname])

  if (wizard === null) {
    return null;
  }


  const houseImgs = {
    'Gryffindor' : 'https://helios-i.mashable.com/imagery/articles/01C6v145juXb479VvIGvkIf/images-1.fill.size_2000x2867.v1611684584.jpg',
    'Ravenclaw' : 'https://helios-i.mashable.com/imagery/articles/01C6v145juXb479VvIGvkIf/images-3.fill.size_2000x2867.v1611684584.jpg',
    'Slytherin' : 'https://helios-i.mashable.com/imagery/articles/01C6v145juXb479VvIGvkIf/images-4.fill.size_2000x2867.v1611684584.jpg',
    'Hufflepuff' : 'https://helios-i.mashable.com/imagery/articles/01C6v145juXb479VvIGvkIf/images-2.fill.size_2000x2867.v1611684584.jpg'
   }

   const friendItems = friends.map((friend) => {
    return (
      <div 
        key={friend.id}
        className="flex cursor-pointer"
        onClick={() => {
          navigate(`/wizards/${friend.id}`)
        }}
      >
        <div className="my-1 mx-1">{friend.firstName}</div>
        <div className="my-1 mr-2">{friend.lastName}</div>
      </div>
    )
   }); 

  return (
    <div className='h-screen bg-amber-100 flex justify-between'>
      <div className="">
        <div className="font-meta font-semibold text-3xl">{wizard.lastName}, {wizard.firstName}</div>
        <div className="font-adamina">Nationality: {wizard.nationality}</div>
        <div>
          Friends :
          <div>
            {friendItems}
          </div>
        </div>
       
      </div>

      <div>
        {
          house ?  <img className="w-60"src={houseImgs[house.name]}/> : null
        }
        
      </div>
    </div>
  )
};

export default WizardShowPage;