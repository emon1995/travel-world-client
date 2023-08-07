import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "../components/Spinner/Spinner";
import useMember from "../hooks/useMember";


const MemberRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isMember, isMemberLoading] = useMember();
    const location = useLocation();

    if (loading || isMemberLoading) {
        return <Spinner />
    }

    if (user && isMember?.role === "member") {
        return children
    }

    return <Navigate to={`/`} state={{ from: location }} replace />
};

export default MemberRoute;