import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "./services";

// if sign in successful, navigate to the wizardslist
// otherwise, display message in red 
const SignInForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const response = await apiFetch({
      path: '/wizards/session',
      method: "POST",
      body: { username, password }
    });

    if (response.status === 401) {
      setError('Incorrect username or password')
    } else {
      navigate('/wizards');
    }
  };

  return (
    <div>
      {error}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <input 
          placeholder="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input 
          placeholder="password"
          value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
        />
        <button>Log In</button>
      </form>
    </div>
  )
};

export default SignInForm;