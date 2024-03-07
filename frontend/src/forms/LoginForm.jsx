import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

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
        if (password === dbuser.password) {
            handleUpdateUser({username: dbuser.username, email: dbuser.email, password: dbuser.password})
            navigate('/home')
        }
        else {
            setSubmitResult('Incorrect password')
        }
        // }
    }

    // console.log(email, dbuser)
    
    return (
        <div>
            <h1>Cosmic Strip</h1>
            <p>No account? <Link to="/signup">Sign up here!</Link></p>
                <div>
                    <label>Email:
                        <input type="email" value={email} name="email"
                            onChange={(e) => handleUpdateEmail(e)} />
                    </label>
                </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Password:
                        <input type="password" value={password} name="password"
                            onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div> 
                <button className="margin" onClick={()=>navigate(-1)}>Back</button><button className="margin">Log in</button>
                <p>{submitResult}</p>
            </form>
        </div>
    )
}

export default LoginForm;