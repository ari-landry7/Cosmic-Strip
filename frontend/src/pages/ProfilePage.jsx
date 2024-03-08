import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext"
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
    const navigate = useNavigate()

    const {currentUser, handleUpdateUser} = useUserContext();

    const [username, setUsername] = useState(currentUser.username);
    const [email, setEmail] = useState(currentUser.email);
    const [password, setPassword] = useState(currentUser.password);
    const [dbUser, setDbuser] = useState()
    const [showElement, setShowElement] = useState(false);
    const [submitResult, setSubmitResult] = useState("")

    
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

    // handleSubmit updates the current user's profile with data received from the form below
    const handleSubmit = async (e) => {
        e.preventDefault()

        const userData = {
            username,
            email,
            password
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
                handleUpdateUser({username: user.username, email: user.email})
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
                <nav className="flex" style={{justifyContent: "space-around"}}>
                    <div><button onClick={handleEditProfile}>Edit Profile</button></div>
                    <div><h2>{currentUser.username}'s Profile</h2></div>
                    <div><button onClick={handleDeleteUser}>Delete Profile</button></div>
                </nav>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            <strong>Username:</strong> <span>
                            {showElement ? <input
                            type="text"
                            value={username}
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            /> : currentUser.username }</span>
                        </label>
                    </div>
                    <div>
                        <label>
                            <strong>Email:</strong> <span>
                            {showElement ? <input
                            type="email"
                            value={email}
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            /> : currentUser.email }</span>
                        </label>
                    </div>
                    <div>
                        {showElement ? <label>
                            <strong>Password:</strong> <span>
                            <input
                            type="password"
                            value={password}
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            /></span>
                        </label> : null}
                    </div>
                    {showElement ? <button className="margin">Confirm changes</button> : null}
                    <div className="margin"><em>{submitResult}</em></div>
                </form>
            </section>
        </div>
    )
}