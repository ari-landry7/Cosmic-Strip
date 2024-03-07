import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setUserEmail] = useState("");
  const [password, setUserPassword] = useState("");
  const [submitResult, setSubmitResult] = useState("");

  const {currentUser, handleUpdateUser} = useUserContext({})

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password,
    };

    try {
      if (password.length < 5) {
        setSubmitResult('Password must be at least 5 characters')
      } else if (password == email) {
        setSubmitResult('Password must not match email address')
      } else {
        const response = await fetch('http://localhost:8000/api/users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json()
        const user = data.data

        if (response.ok) {
          console.log(user)

          handleUpdateUser({username: user.username, email: user.email})
          navigate('/home')
        } else {
          setSubmitResult('A user with this username or email already exists. Please try again with different values')
        }
      } 
    } catch (error) {
        setSubmitResult('Something seems to be wrong. Try again')
        console.log('An error occurred: ', error)  
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
