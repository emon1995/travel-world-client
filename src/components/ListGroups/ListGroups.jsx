// import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "../Spinner/Spinner";


const ListGroups = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    // get all data
    const { data: groups = [], isLoading, refetch } = useQuery({
        queryKey: ['groups'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/groups`);
            return res.data;
        }
    })

    // console.log(groups);

    // join button handle
    const handleJoin = id => {
        if (!user?.email) {
            navigate("/login");
        } else {
            if (id) {
                fetch(`${import.meta.env.VITE_BASE_URL}/join-groups/${id}`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify({ email: user?.email, name: user?.displayName, img: user?.photoURL, isJoin: true })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        refetch();
                    })
                    .catch(err => {
                        toast.error(err.message);
                    })
            }
        }
    }

    // all groups data fetching
    // useEffect(() => {
    //     fetch(`${import.meta.env.VITE_BASE_URL}/groups/`)
    //         .then(res => res.json())
    //         .then(data => {
    //             setGroups(data);
    //         })
    //         .catch(err => {
    //             toast.error(err.message);
    //         })
    // }, []);


    return (
        <div className="flex items-center justify-center flex-col mb-4">
            {
                isLoading && <Spinner />
            }
            {
                groups && Array.isArray(groups) && groups.length > 0 && groups.map((group, i) => <div key={group._id} className="flex items-center justify-center gap-3 h-20 p-4 rounded bg-primary text-primary-content mb-4">
                    <p>{i + 1}. {group?.groupName}</p>
                    {
                        group?.membersInfo && group?.membersInfo.map(group => group.email).includes(user?.email) ? <Link to={`/view-group/${group?._id}`}><button className="btn btn-secondary">View</button></Link> : <button onClick={() => handleJoin(group._id)} className="btn btn-secondary">Join</button>
                    }
                </div>)
            }
        </div>
    );
};

export default ListGroups;