import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { Box, TextField, Button } from "@mui/material";

function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitResult, setSubmitResult] = useState("");

  const { currentUser, handleUpdateUser } = useUserContext({});

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
        setSubmitResult("Password must be at least 5 characters");
      } else if (password == email) {
        setSubmitResult("Password must not match email address");
      } else {
        const response = await fetch("http://localhost:8000/api/users/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        });

        const data = await response.json();
        const user = data.data;

        if (response.ok) {
          console.log(user);

          handleUpdateUser({ username: user.username, email: user.email });
          navigate("/home");
        } else {
          setSubmitResult(
            "A user with this username or email already exists. Please try again with different values"
          );
        }
      }
    } catch (error) {
      setSubmitResult("Something seems to be wrong. Try again");
      console.log("An error occurred: ", error);
    }
  };

  return (
    <div>
      <h1>Cosmic Strip</h1>
      <p>
        Already have an account? <Link to="/login">Log in</Link> instead!
      </p>
      <Box component="form" onSubmit={handleSubmit}>
        <div>
          <TextField
            required
            variant="filled"
            value={username}
            name="username"
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <TextField
            required
            variant="filled"
            type="email"
            value={email}
            name="email"
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            required
            variant="filled"
            type="password"
            value={password}
            name="password"
            label="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Button variant="contained" onClick={() => navigate(-1)}>
            Back
          </Button>
          <Button variant="contained" onClick={() => navigate("/")}>
            Guest Page
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Sign up
          </Button>
        </div>
        <p>{submitResult}</p>
      </Box>
    </div>
  );
}

export default SignupForm;
