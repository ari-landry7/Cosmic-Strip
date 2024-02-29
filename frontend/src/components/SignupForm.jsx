import { useState } from "react";
import LoginForm from "./LoginForm";
import { useUserContext } from "../context/UserContext";
import { Link } from "react-router-dom";

function SignupForm () {
    const [username, setUsername] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [submitResult, setSubmitResult] = useState('');

    const {currentUser, handleUpdateUser} = useUserContext();

    const handleSubmit = (e) => {
        e.preventDefault()
        if (userPassword.length < 5) {
            setSubmitResult('Password must be at least 5 characters')
        } else if (userPassword === userEmail) {
            setSubmitResult('Password must not match email address')
        } else if (!userPassword) {
            setSubmitResult('Must enter a password')
        } else {
            handleUpdateUser({email: userEmail, username: username})
        }
    }

    if (currentUser.email) return (
        <div>
            <LoginForm />
        </div>
    )

    return (
        <div>
            <h1>Cosmic Strip</h1>
            <p>Already have an account? <Link to="/login">Log in</Link> instead!</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:
                        <input type="text" value={username} name="username"
                            onChange={(e) => setUsername(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>Email:
                        <input type="email" value={userEmail} name="userEmail"
                            onChange={(e) => setUserEmail(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>Password:
                        <input type="password" value={userPassword} name="userPassword"
                            onChange={(e) => setUserPassword(e.target.value)} />
                    </label>
                </div>
                <button className="margin" onClick={()=>navigate(-1)}>Back</button><button className="margin">Sign up</button>
                <p>{submitResult}</p>
            </form>
        </div>
    )
}

export default SignupForm;