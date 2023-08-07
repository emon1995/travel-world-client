import { Navigate, useLocation } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner/Spinner";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    // console.log(isAdmin, loading, isAdminLoading, user);

    if (loading || isAdminLoading) {
        // refetch()
        return <Spinner />
    }

    if (user && isAdmin?.role === "admin") {
        return children
    }

    return <Navigate to={`/`} state={{ from: location }} replace />
};

export default AdminRoute;