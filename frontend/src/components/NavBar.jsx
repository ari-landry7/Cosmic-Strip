import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { ButtonGroup, Button } from "@mui/material";

export default function NavBar() {
    const {currentUser, handleUpdateUser} = useUserContext()

    // function to log out user when called. The NavLink below then redirects the user to the guest page
    const logout = () => {
        handleUpdateUser({username: null})
    }
    
    return (
        <ButtonGroup variant="outlined" className="margin">
            <NavLink to="/home"><Button style={{width: "19.5vw"}}>Home</Button></NavLink>
            {/* <NavLink to="/home">Popular</NavLink>
            <NavLink to="/home">Undiscovered</NavLink> */}
            <NavLink to="/new"><Button style={{width: "19.5vw"}}>New Post</Button></NavLink>
            <NavLink to="/profile"><Button style={{width: "19.5vw"}}>Profile</Button></NavLink>
            <NavLink onClick={logout} to="/"><Button style={{width: "19.5vw"}}>Log out</Button></NavLink>
        </ButtonGroup>
    )
}