import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

function findUser(username) {
    const [response, setResponse] = useState("")
    const [user, setUser] = useState()
    const {currentUser, handleUpdateUser} = useUserContext({})

    useEffect(() => {
        console.log("running effect");
        let ignore = false;

        fetch("http://localhost:8000/api/users/" + username)
            .then(response => response.json())
            .then(json => {
                // console.log(json.data)
                setUser(json.data[0])
                // console.log(user)
            })
        return () => {
            ignore = true;
            console.log("cleanup effect");
            setResponse("Success")
            };
    }, [currentUser])

    return user
}

function LoginForm() {
    const navigate = useNavigate()
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [submitResult, setSubmitResult] = useState('')

    const {currentUser, handleUpdateUser} = useUserContext({})

    const user = findUser(currentUser.username)

    const handleUpdateUsername = (e) => {
        // console.log(user)
        setUsername(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        // if (password.length < 5) {
        //     setSubmitResult('Password must be at least 5 characters')
        // } else if (password === email) {
        //     setSubmitResult('Password must not match email address')
        // } else {
            // setSubmitResult('Successful login.')
        handleUpdateUser({username: username})
        if (password === user.password) navigate('/home')
        else {
            setSubmitResult('Incorrect password')
        }
        // }
    }

    // console.log(currentUser, user)
    
    return (
        <div>
            <h1>Cosmic Strip</h1>
            <p>No account? <Link to="/signup">Sign up here!</Link></p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:
                        <input type="text" value={username} name="username"
                            onChange={(e) => handleUpdateUsername(e)} />
                    </label>
                </div>
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