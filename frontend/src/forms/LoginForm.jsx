import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import HomePage from "../pages/HomePage";

function LoginForm() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitResult, setSubmitResult] = useState('')

    const {currentUser, handleUpdateUser} = useUserContext()

    useEffect(() => {
        fetch("http://localhost:8000/api/users/")
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        // if (password.length < 5) {
        //     setSubmitResult('Password must be at least 5 characters')
        // } else if (password === email) {
        //     setSubmitResult('Password must not match email address')
        // } else {
            // setSubmitResult('Successful login.')
            handleUpdateUser({email: email, username: username})
        // }
    }

    if (currentUser.email) return (
        <div>
            <HomePage />
        </div>
    )

    return (
        <div>
            <h1>Cosmic Strip</h1>
            <p>No account? <Link to="/signup">Sign up here!</Link></p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:
                        <input type="email" value={userEmail} name="userEmail"
                            onChange={(e) => setEmail(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>Password:
                        <input type="password" value={password} name="userPassword"
                            onChange={(e) => setUserPassword(e.target.value)} />
                    </label>
                </div> 
                <button className="margin" onClick={()=>navigate(-1)}>Back</button><button className="margin">Log in</button>
                <p>{submitResult}</p>
            </form>
        </div>
    )
}

export default LoginForm;