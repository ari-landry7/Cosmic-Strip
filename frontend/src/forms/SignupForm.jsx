import { useState } from "react";
// import LoginForm from "./LoginForm";
// import { useUserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const [submitResult, setSubmitResult] = useState("");

  const navigate = useNavigate();

  const [response, setResponseMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    try {
        const response = await fetch('http://localhost:8000/api/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json()
        if (response.ok) {
            setResponseMessage('Success')
            navigate('/home')
        } else {
            setErrorMessage(data.error)
            console.error('Oops: ', data.error)
        };
    } catch (error) {
        setErrorMessage('Something seems to be wrong. Try again')
        console.error('Oops', error)  
    }

  };

  return (
    <div>
      <h1>Cosmic Strip</h1>
      <p>
        Already have an account? <Link to="/login">Log in</Link> instead!
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Username:
            <input
              type="text"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
              type="email"
              value={email}
              name="userEmail"
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              value={password}
              name="userPassword"
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </label>
        </div>
        <button className="margin" onClick={() => navigate(-1)}>
          Back
        </button>
        <button className="margin">Sign up</button>
        <p>{submitResult}</p>
      </form>
    </div>
  );
}

export default SignupForm;
