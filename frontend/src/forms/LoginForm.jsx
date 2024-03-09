import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { Box, Button, TextField } from "@mui/material";

function LoginForm() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [dbuser, setDbuser] = useState()
    const [submitResult, setSubmitResult] = useState('')

    const {currentUser, handleUpdateUser} = useUserContext({})

    const handleUpdateEmail = (e) => {
        setEmail(e.target.value)
    }

    useEffect(() => {
        console.log("running effect");
        let ignore = false;

        fetch("http://localhost:8000/api/users/" + email)
            .then(response => response.json())
            .then(json => {
                if (!ignore) setDbuser(json.data[0])
            })
        return () => {
            ignore = true;
            console.log("cleanup effect");
            // setResponse("Success")
            };
    }, [email])

    const handleSubmit = (e) => {
        e.preventDefault()
        // if (password.length < 5) {
        //     setSubmitResult('Password must be at least 5 characters')
        // } else if (password === email) {
        //     setSubmitResult('Password must not match email address')
        // } else {
            // setSubmitResult('Successful login.')  
        handleUpdateUser({email: currentUser.email}) 
        console.log(dbuser, password)
        try {
            if (password === dbuser.password) {
                handleUpdateUser({username: dbuser.username, email: dbuser.email, password: dbuser.password})
                navigate('/home')
            }
            else {
                setSubmitResult('Incorrect password')
            }
        } catch (error) {
            console.log('An error occurred: ', error)
            setSubmitResult('User not found')
        }
        // }
    }

    // console.log(email, dbuser)
    
    return (
        <div>
            <h1>Cosmic Strip</h1>
            <p>No account? <Link to="/signup">Sign up here!</Link></p>
                <div className="margin">
                    <TextField required variant="filled" type="email"
                        value={email} name="email" label="Email"
                        onChange={(e) => handleUpdateEmail(e)} />
                </div>
            <Box component="form" onSubmit={handleSubmit}>
                <div className="margin">
                    <TextField required variant="filled" type="password" 
                        value={password} name="password" label="Password"
                        onChange={(e) => setPassword(e.target.value)} />
                </div> 
                <div className="margin" style={{display: "flex", justifyContent: "space-around"}}>
                    <Button variant="contained" onClick={()=>navigate(-1)}>Back</Button>
                    <Button variant="contained" onClick={() => navigate('/')}>Guest Page</Button>
                    <Button variant="contained" onClick={handleSubmit}>Log in</Button>
                </div>
                
                <p>{submitResult}</p>
            </Box>
        </div>
    )
}

export default LoginForm;