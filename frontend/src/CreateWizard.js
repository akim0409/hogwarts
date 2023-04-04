import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "./services";

const CreateWizard = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    await apiFetch({
      path: '/wizards',
      method: 'POST',
      body: { firstName, lastName, nationality, username, password}
    })
  };

  return (
    <div className="bg-amber-100 h-screen justify-center p-16">
      <div className="text-5xl font-adamina text-amber-900">Hogarts Student Admission Form</div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
          navigate('/wizards');
        }}
      >
        <input
          className="py-1 px-4 bg-amber-200 rounded-md"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}

        />
        <input 
          className="py-1 px-4 bg-amber-200 rounded-md "
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <input 
          className="py-1 px-4 bg-amber-200 rounded-md "
          placeholder="Nationality"
          value={nationality}
          onChange={(e) => {
            setNationality(e.target.value);
          }}
        />
        <input 
          className="py-1 px-4 bg-amber-200 rounded-md "
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input 
          className="py-1 px-4 bg-amber-200 rounded-md "
          placeholder="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <button className="py-1 px-4 bg-amber-400 rounded-md text-amber-900 font-adamina">Admit</button>
      </form>
    </div>
  )
};

export default CreateWizard;