import { NavLink } from "react-router-dom";


const ActiveRoutes = ({ children, to, color: colorText, bg }) => {
    return (
        <NavLink to={to} className={({ isActive }) => isActive ? `active ${bg ? "" : " text-white"}` : `${colorText ? "text-white" : "text-sky-400"}`}>
            {children}
        </NavLink>
    );
};

export default ActiveRoutes;