import { Link } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

export default function AdSpace() {
    const {currentUser} = useUserContext()
  return (
    <div style={{ margin: ".5em .25em 0" }}>
        {!currentUser.subscribeStatus ? <div style={{width: "20em"}}>
            {/* <header className="header" style={{top: "8.5em"}}></header> */}
                <img className="ad" 
                    src="https://placehold.co/400x400/5635B2/fff?text=Ad+Space"
                />
                <img className="ad"
                    src="https://placehold.co/400x600/85c6fb/000012?text=Ad+Space"
                /> 
                <img className="ad"
                    src="https://placehold.co/400x800/fff/1f1f1f?text=Ad+Space"
                /> 
        </div> : null}
    </div>
  );
}
