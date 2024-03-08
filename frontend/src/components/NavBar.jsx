import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function NavBar() {
    const {currentUser, handleUpdateUser} = useUserContext()

    const logout = () => {
        handleUpdateUser({username: null})
    }
    
    return (
        <nav className="nav">
                <NavLink to="/home">Home</NavLink>
                <NavLink to="/home">Popular</NavLink>
                <NavLink to="/home">Undiscovered</NavLink>
                <NavLink to="/new">New Post</NavLink>
                <NavLink to="/profile">Profile</NavLink>
                <NavLink onClick={logout} to="/">Log out</NavLink>
        </nav>
    )
}