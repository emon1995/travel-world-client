import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import App from "../App";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";



const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <App />
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