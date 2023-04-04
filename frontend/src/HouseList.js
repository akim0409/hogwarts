import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "./services";

const HouseList = () => {
  const [houses, setHouses] = useState([]);
  const navigate = useNavigate();

  const fetchHouses = async () => {
    const response = await apiFetch({
      path: '/houses',
      method: 'GET'
    })
    const data = await response.json();
    setHouses(data);
  };

  useEffect(() => {
    fetchHouses();
  }, [])

  
  const houseImgs = {
    'Gryffindor' : 'https://helios-i.mashable.com/imagery/articles/01C6v145juXb479VvIGvkIf/images-1.fill.size_2000x2867.v1611684584.jpg',
    'Ravenclaw' : 'https://helios-i.mashable.com/imagery/articles/01C6v145juXb479VvIGvkIf/images-3.fill.size_2000x2867.v1611684584.jpg',
    'Slytherin' : 'https://helios-i.mashable.com/imagery/articles/01C6v145juXb479VvIGvkIf/images-4.fill.size_2000x2867.v1611684584.jpg',
    'Hufflepuff' : 'https://helios-i.mashable.com/imagery/articles/01C6v145juXb479VvIGvkIf/images-2.fill.size_2000x2867.v1611684584.jpg'
   }

 const houseItems = houses.map((house) => {
    return <div
      className="m-2 cursor-pointer"
      key={house.id}
      onClick={() => {
        navigate(`/houses/${house.id}`)
      }}
    >
      <img className="w-64 hover:w-72" src={houseImgs[house.name]} />
    </div>
 }) 


  return (
    <div className="h-screen bg-amber-100 flex justify-center items-center">
      {houseItems}
    </div>
  )
};

export default HouseList;