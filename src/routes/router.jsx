import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import App from "../App";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import CreateGroup from "../pages/CreateGroup/CreateGroup";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Groups from "../pages/Groups/Groups";
import ViewGroup from "../pages/ViewGroup/ViewGroup";
import SinglePost from "../pages/SinglePost/SinglePost";



const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/",
                element: <App />
            },
            {
                path: "/create-group",
                element: <PrivateRoute><CreateGroup /></PrivateRoute>
            },
            {
                path: "/groups",
                element: <PrivateRoute><Groups /></PrivateRoute>
            },
            {
                path: "/view-group/:id",
                element: <PrivateRoute><ViewGroup /></PrivateRoute>
            },
            {
                path: "/single-post/:id",
                element: <PrivateRoute><SinglePost /></PrivateRoute>
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: <Signup />
            }

        ]
    }
])

export default router;