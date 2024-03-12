import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext"
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { Box, Button, Checkbox, FormControlLabel, Input, InputLabel, TextField } from "@mui/material";

export default function ProfilePage() {
    const navigate = useNavigate()

    const {currentUser, handleUpdateUser} = useUserContext();

    const [username, setUsername] = useState(currentUser.username);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState(currentUser.password);
    const [dbUser, setDbuser] = useState()
    const [showElement, setShowElement] = useState(false);
    const [submitResult, setSubmitResult] = useState("")
    const [subscribeStatus, setSubscribeStatus] = useState(currentUser.subscribeStatus)
    
    useEffect(() => {
        console.log("running effect");
        let ignore = false;

        fetch("http://localhost:8000/api/users/" + currentUser.email)
            .then(response => response.json())
            .then(json => {
                // console.log(json.data)
                if (!ignore) setDbuser(json.data[0])
            })
        return () => {
            ignore = true;
            console.log("cleanup effect");
            };
    }, [showElement])

    // handleEditProfile shows a form when clicked that can be used to edit the current user's profile
    const handleEditProfile = () => {
        if (!showElement) {
            setShowElement(true)
        } else {
            setShowElement(false)
        }
    }

    const handleSubscribe = () => {
        if (subscribeStatus) {
            setSubscribeStatus(false)
        } else setSubscribeStatus(true)
    }

    // handleSubmit updates the current user's profile with data received from the form below
    const handleSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            username,
            email,
            password,
            subscribeStatus
        }

        try {
            if (password.length < 5) {
                setSubmitResult('Password must be at least 5 characters')
            }
            else if (username.length >= 1 && email.length >= 1 && password.length >= 5) {
                const response = await fetch('http://localhost:8000/api/users/' + dbUser._id, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(userData)
                })
                const data = await response.json()
                const user = data.data

                // console.log(user)
                if (subscribeStatus) {
                    handleUpdateUser({username: user.username, email: user.email, password: user.password, subscribeStatus: true})
                } else handleUpdateUser({username: user.username, email: user.email, password: user.password, subscribeStatus: false})
                
                setShowElement(false)
                setSubmitResult('Profile updated successfully')
            } else {
                setSubmitResult('Failed to update: fields must not be empty')
            }

        } catch (error) {
            setSubmitResult('Failed to update profile. Try again')
            console.log('Error: ', error)
        }
    }

    // deleteUser deletes the current user's profile
    const deleteUser = (id) => {
        try {
            fetch("http://localhost:8000/api/users/" + id, {
                method: "DELETE",
            })
            .then(response => response.json())
            .then(json => {
                console.log("deleteUser: ", json.data);
            })
        } catch (error) {
            setSubmitResult('Failed to delete user')
            console.log('An error occurred: ', error)
        }
    };

    // handleDeleteUser shows a pop up to allow the user to confirm profile deletion. If cancel
    // is pressed, the profile is not deleted
    const handleDeleteUser = () => {
        if (confirm("STOP! Are you sure you want to delete your profile?") === true) {
            deleteUser(dbUser._id)
            handleUpdateUser({username: null})
            setSubmitResult('Profile deleted')
            navigate('/')
        } else {
            setSubmitResult('Profile not deleted')
        }
    }

    return (
        <div style={{width: "80vw"}}>
            <div className="header">
                <h1>Cosmic Strip</h1>
                <NavBar />
            </div>
            <section>
                <nav className="flex" style={{justifyContent: "space-around", alignItems: "center"}}>
                    <div><Button variant="contained" onClick={handleEditProfile}>Edit Profile</Button></div>
                    <div><h2>{currentUser.username}'s Profile</h2></div>
                    <div><Button variant="contained" onClick={handleDeleteUser}>Delete Profile</Button></div>
                </nav>
                <Box component="form" onSubmit={handleSubmit}>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <InputLabel for="username"><strong>Username:</strong></InputLabel>
                        <span>
                            {showElement ? <TextField
                            id="username"
                            type="text"
                            value={username}
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            /> : currentUser.username }
                        </span>
                        
                    </div>
                    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <InputLabel for="email"><strong>Email: </strong></InputLabel> 
                        <span>
                            {showElement ? <TextField
                            id="email"
                            type="email"
                            value={email}
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            /> : currentUser.email }
                        </span>
                    </div>
                    <div>
                        {showElement ? <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
                        <InputLabel for="password"><strong>Password:</strong></InputLabel>
                            <span>
                                <TextField
                                id="password"
                                type="password"
                                value={password}
                                name="password"
                                onChange={(e) => setPassword(e.target.value)}
                                />
                            </span>
                        </div> : null}
                    </div>
                    <div>{}</div>
                    <div>
                        {showElement ? !currentUser.subscribeStatus ? <FormControlLabel 
                            control={<Checkbox onChange={handleSubscribe} />} 
                            label="Subscribe for an ad-free experience!" /> : <FormControlLabel control={<Checkbox onChange={handleSubscribe} />} label="Unsubscribe" /> : 
                            currentUser.subscribeStatus ? <InputLabel>You are subscribed!</InputLabel> : <InputLabel>You are not subscribed</InputLabel>}
                    </div>
                    {showElement ? <Button onClick={handleSubmit} variant="contained" className="margin">Confirm changes</Button> : null}
                    <div className="margin"><em>{submitResult}</em></div>
                </Box>
            </section>
        </div>
    )
}