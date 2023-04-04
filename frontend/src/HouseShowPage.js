import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiFetch } from "./services";

const HouseShowPage = () => {
  const [house, setHouse] = useState(null);
  const [wizards, setWizards] = useState([]);
  const params = useParams();

  const fetchHouseAndStudents = async () => {
    const response = await apiFetch({
      path: `/houses/${params.houseId}`,
      method: 'GET'
    })

    const data = await response.json();
    setHouse(data.house);
    setWizards(data.wizards);
  };

  useEffect(() => {
    fetchHouseAndStudents();
  }, [])


  if (house === null) {
    return null;
  }

  const houseImgs = {
    'Gryffindor' : 'https://helios-i.mashable.com/imagery/articles/01C6v145juXb479VvIGvkIf/images-1.fill.size_2000x2867.v1611684584.jpg',
    'Ravenclaw' : 'https://helios-i.mashable.com/imagery/articles/01C6v145juXb479VvIGvkIf/images-3.fill.size_2000x2867.v1611684584.jpg',
    'Slytherin' : 'https://helios-i.mashable.com/imagery/articles/01C6v145juXb479VvIGvkIf/images-4.fill.size_2000x2867.v1611684584.jpg',
    'Hufflepuff' : 'https://helios-i.mashable.com/imagery/articles/01C6v145juXb479VvIGvkIf/images-2.fill.size_2000x2867.v1611684584.jpg'
   }

   const wizardItems = wizards.map((wizard) => {
    return <div 
      key={wizard.id}
      className="flex"
    >
      <div className="my-1 mx-1">{wizard.firstName}</div>
      <div className="my-1 mr-2">{wizard.lastName}</div>
    </div>
   });


  return (
    <div className="h-screen bg-amber-100 flex justify-between p-12">
      <div className="">
        <div className={`font-meta font-semibold text-5xl text-${house.color}-700`}>
          {house.name}
        </div>
        <div className="mt-8 text-xl font-adamina font-semibold text-amber-600">
          House wizards :
        </div>
        <div className="font-crimson text-lg">
            {wizardItems}
          </div>
      </div>
      <div>
        <img className='w-72' src={houseImgs[house.name]}/>
      </div>
    </div>
  )
};

export default HouseShowPage;