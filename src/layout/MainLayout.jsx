import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";


const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="py-28 min-h-[calc(100vh-200px)]">
                <Outlet />
            </div>

        </div>
    );
};

export default MainLayout;