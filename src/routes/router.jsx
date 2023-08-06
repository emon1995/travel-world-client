import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import App from "../App";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import CreateGroup from "../pages/CreateGroup/CreateGroup";
import PrivateRoute from "./PrivateRoute";
import ErrorPage from "../pages/ErrorPage/ErrorPage";



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