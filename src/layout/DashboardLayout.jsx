import { Outlet } from "react-router-dom";
import ActiveRoutes from "../components/ActiveRoutes/ActiveRoutes";
import { FaHome, FaMoneyCheckAlt } from 'react-icons/fa';
import { SiGoogleclassroom } from "react-icons/si";
import { MdOutlineManageHistory, MdOutlineManageAccounts, MdOutlineIntegrationInstructions } from "react-icons/md";
import { BiBookAdd, BiBookBookmark } from "react-icons/bi";
import useAuth from "../hooks/useAuth";
// import { useEffect, useState } from "react";
// import axios from "axios";



const DashboardLayout = () => {
    const { role, user } = useAuth();

    return (
        <>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle top-20" />
                <div className="drawer-content flex flex-col ">
                    {/* Navbar */}
                    <div className="navbar">
                        <div className="flex-none lg:hidden ">
                            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>

                    </div>
                    {/* Page content here */}

                    <div className='py-28 min-h-[calc(100vh-68px)]'>
                        <Outlet />
                    </div>

                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                    <ul className="menu text-lg p-4 w-80 h-full bg-[#283a5ae6] pt-10">
                        <div className="mb-4 text-center text-white">
                            <div className="avatar">
                                <div className="w-24 rounded-full">
                                    <img referrerPolicy="no-referrer" src={user?.photoURL} />
                                </div>
                            </div>
                            <h1>{user?.displayName}</h1>
                            <h1>{user?.email}</h1>
                        </div>
                        {/* Sidebar content here */}
                        {/* admin */}
                        {
                            role === "admin" && <>
                                <li className="text-white"><ActiveRoutes bg={false} color={true} to={`/dashboard/manage-posts`}><MdOutlineManageHistory />  Manage Posts</ActiveRoutes></li>
                                <li className="text-white"><ActiveRoutes bg={false} color={true} to={`/dashboard/manage-groups`}><FaMoneyCheckAlt />  Manage Groups</ActiveRoutes></li>
                                <li>
                                    <ActiveRoutes bg={false} color={true} to={`/dashboard/manage-members`}><MdOutlineManageAccounts /> Manage Members</ActiveRoutes>
                                </li>
                            </>
                        }

                        {/* member */}
                        {
                            role === "member" && <>
                                <li className="text-white"><ActiveRoutes bg={false} color={true} to={`/dashboard/my-posts`}><BiBookAdd />  My Posts</ActiveRoutes></li>
                                <li>
                                    <ActiveRoutes bg={false} color={true} to={`/dashboard/my-groups`}><BiBookBookmark /> My Groups</ActiveRoutes>
                                </li>
                            </>
                        }

                        <div className="divider text-white">OR</div>

                        <li className="text-white"><ActiveRoutes color={true} to={`/`}>  <FaHome /> Home</ActiveRoutes></li>
                        <li>
                            <ActiveRoutes color={true} to={`/create-group`}><MdOutlineIntegrationInstructions /> Create Groups</ActiveRoutes>
                        </li>
                        <li><ActiveRoutes color={true} to={`/groups`}> <SiGoogleclassroom /> Groups</ActiveRoutes></li>
                    </ul>

                </div>
            </div >
        </>
    );
};

export default DashboardLayout;