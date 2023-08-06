import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";


const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="py-28">
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;