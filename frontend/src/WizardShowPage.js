import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { apiFetch } from "./services";

const WizardShowPage = () => {
  const [wizard, setWizard] = useState(null);
  const [house, setHouse] = useState(null);
  const [friends, setFriends] = useState([]);
  const [isFriend, setIsFriend] = useState(false);
  const [editing, setEditing] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [error, setError] = useState(''); 

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
    setIsFriend(data.isFriend);
    setFirstName(data.wizard.firstName);
    setLastName(data.wizard.lastName);
    setNationality(data.wizard.nationality);
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

   const handleSubmit = async () => {
    const response = await apiFetch({
      path: `/wizards/${params.wizardId}`,
      method: 'PUT',
      body: { firstName, lastName, nationality }
    });

    if (response.status === 401) {
      setError('Cannot update another user');
    } else {
      fetchWizardInformations();
    }
   }

   const handleAddFriend = async () => {
    const response = await apiFetch({
      path: `/wizards/friends/${params.wizardId}`,
      method: 'POST'
    });
    fetchWizardInformations();
   }

  return (
    <div className='h-screen bg-amber-100 flex justify-between'>
      <div>{error}</div>
      <button onClick={() => {setEditing(true)}}>update</button>
      {
        editing ? <form 
        onSubmit={
          (e) => { 
            e.preventDefault();
            handleSubmit()
          }
        }
        >
          <input value={firstName} placeholder='firstname' onChange={(e) => {setFirstName(e.target.value)}}/>
          <input value={lastName} placeholder='lastName' onChange={(e) => {setLastName(e.target.value)}}/>
          <input value={nationality} placeholder='lastName' onChange={(e) => {setNationality(e.target.value)}}/>
          <button>submit</button>

        </form> : null
      }
      <div className="">
        <div className="font-meta font-semibold text-3xl">{wizard.lastName}, {wizard.firstName}</div>
        { isFriend ? 
        <i className="fa-solid fa-heart"></i> 
        : <button onClick={(e) => {
          e.preventDefault();
          handleAddFriend();
        }}>Add Friend</button>
        }
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