import { useEffect } from "react";
import { usePostContext } from "../context/PostContext";

function SearchBar() {
    const [currentPosts, setCurrentPosts] = usePostContext()

    useEffect((e) => {
        let ignore = false;

        fetch("http://localhost:8000/api/posts")
            .then(response => response.json())
            .then(json => {
                if (!ignore) setCurrentPosts(json.data);
            });

        return () => {
            ignore = true;
            console.log("cleanup effect");
        };
    }, [])

    return (
        <div>
            {currentPosts}
        </div>
    )
}

export default SearchBar;