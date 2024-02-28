import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import HomePage from "../pages/HomePage";

function LoginForm() {
    const navigate = useNavigate()
    const [userEmail, setUserEmail] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [submitResult, setSubmitResult] = useState('')

    const {currentUser, handleUpdateUser} = useUserContext()

    const handleSubmit = (e) => {
        e.preventDefault()
        if (userPassword.length < 5) {
            setSubmitResult('Password must be at least 5 characters')
        } else if (userPassword === userEmail) {
            setSubmitResult('Password must not match email address')
        } else {
            // setSubmitResult('Successful login.')
            handleUpdateUser({email: userEmail})
        }
    }

    if (currentUser.email) return (
        <div>
            <HomePage />
        </div>
    )

    return (
        <div>
            <h1>Cosmic Strip</h1>
            <form onSubmit={handleSubmit}>
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
                <button className="margin" onClick={()=>navigate(-1)}>Back</button><button className="margin">Log in</button>
                <p>{submitResult}</p>
            </form>
        </div>
    )
}

export default LoginForm;