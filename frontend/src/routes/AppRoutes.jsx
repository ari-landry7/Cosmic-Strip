import { Route, Routes } from "react-router-dom"
import LoginForm from "../components/LoginForm"
import HomePage from "../pages/HomePage"
import PageNotFound from "../pages/PageNotFound"
import GuestPage from "../pages/GuestPage"
import CreatePost from "../pages/CreatePost"

function AppRoutes(props) {
    return (
        <Routes>
            <Route index element={<GuestPage {...props} />} />
            <Route path='/home' element={<HomePage {...props} />} />
            <Route path='/login' element={<LoginForm {...props} />} />
            <Route path='/new' element={<CreatePost {...props} />} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default AppRoutes;