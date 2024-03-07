import { Route, Routes } from "react-router-dom"
import LoginForm from "../forms/LoginForm"
import HomePage from "../pages/HomePage"
import PageNotFound from "../pages/PageNotFound"
import GuestPage from "../pages/GuestPage"
import CreatePost from "../pages/CreatePost"
import ProtectedRoute from "./ProtectedRoute"
import SignupForm from "../forms/SignupForm"
import ProfilePage from "../pages/ProfilePage"

function AppRoutes(props) {
    return (
        <Routes>
            <Route index element={<GuestPage {...props} />} />
            <Route path='/home' element={<ProtectedRoute><HomePage {...props} /></ProtectedRoute>} />
            <Route path='/login' element={<LoginForm />} />
            <Route path='/signup' element={<SignupForm />} />
            <Route path='/profile' element={<ProtectedRoute><ProfilePage {...props} /></ProtectedRoute>} />
            <Route path='/new' element={<ProtectedRoute><CreatePost {...props} /></ProtectedRoute>} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default AppRoutes;