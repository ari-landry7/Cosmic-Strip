import { useState } from "react";
import { useUserContext } from "../context/UserContext"
import NavBar from "../components/NavBar";

export default function ProfilePage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showElement, setShowElement] = useState(false);

    const {currentUser, handleUpdateUser} = useUserContext();

    const handleEditProfile = () => {
        if (!showElement) {
            setShowElement(true)
        } else {
            setShowElement(false)
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
                    <div><button>Delete Profile</button></div>
                </nav>
                <form>
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
                            type="text"
                            value={email}
                            name="email"
                            disabled={showElement}
                            onChange={(e) => setEmail(e.target.value)}
                            /> : currentUser.email }</span>
                        </label>
                    </div>
                    <div>
                        {showElement ? <label>
                            <strong>Password:</strong> <span>
                            <input
                            type="text"
                            value={password}
                            name="password"
                            disabled={showElement}
                            onChange={(e) => setPassword(e.target.value)}
                            /></span>
                        </label> : null}
                    </div>
                </form>
            </section>
        </div>
    )
}