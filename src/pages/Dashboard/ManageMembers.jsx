
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from '@tanstack/react-query'
import { toast } from "react-hot-toast";
import Spinner from "../../components/Spinner/Spinner";


const ManageMembers = () => {
    const [axiosSecure] = useAxiosSecure();

    const { data: groups = [], refetch, isLoading } = useQuery({
        queryKey: ['manage-member'],
        queryFn: async () => {
            const res = await axiosSecure.get("/manage-member");
            // console.log(res.data);
            return res.data;
        }
    })


    console.log(groups);

    const handleUserDelete = async (id, groupId) => {
        console.log(id);
        const res = await axiosSecure.delete(`/manage-member/${id}?groupId=${groupId}`);
        console.log(res.data);
        if (res?.data?.modifiedCount) {
            refetch();
            toast.success(`Member Remove!`);
        }
    }

    return (
        <>
            {/* <h1 className="text-3xl font-bold text-sky-400 text-center mb-8">Manage Users </h1> */}
            {
                isLoading && <Spinner />
            }
            {
                groups && Array.isArray(groups) && groups.length > 0 ? <div className="overflow-x-auto">
                    <table className="table table-pin-rows table-pin-cols">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Image & Name</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                groups.map((group) => (
                                    group.membersInfo.map((user, i) => <tr key={user._id}>
                                        <th>
                                            {i + 1}
                                        </th>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={user?.img} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{user?.name}</div>

                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {user?.email}
                                        </td>

                                        <th>
                                            <button disabled={group?.userEmail === user?.email} onClick={() => handleUserDelete(group?._id, user?._id)} className="btn btn-error btn-xs">Remove</button>
                                        </th>
                                    </tr>)
                                ))
                            }

                        </tbody>
                    </table>
                </div> : ""
            }

        </>
    );
};

export default ManageMembers;