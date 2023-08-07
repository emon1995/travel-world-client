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
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import AdminRoute from "./AdminRoute";
import ManageMembers from "../pages/Dashboard/ManageMembers";
import ManageGroups from "../pages/Dashboard/ManageGroups";
import ManagePosts from "../pages/Dashboard/ManagePosts";
import MemberRoute from "./MemberRoute";
import MyPosts from "../pages/Dashboard/MyPosts";
import MyGroups from "../pages/Dashboard/MyGroups";



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
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "",
                element: <Dashboard />
            },
            {
                path: "manage-members",
                element: <AdminRoute><ManageMembers /> </AdminRoute>
            },
            {
                path: "manage-groups",
                element: <AdminRoute><ManageGroups /> </AdminRoute>
            },
            {
                path: "manage-posts",
                element: <AdminRoute><ManagePosts /> </AdminRoute>
            },
            {
                path: "my-posts",
                element: <MemberRoute><MyPosts /> </MemberRoute>
            },
            {
                path: "my-groups",
                element: <MemberRoute><MyGroups /> </MemberRoute>
            },
        ]
    }
])

export default router;