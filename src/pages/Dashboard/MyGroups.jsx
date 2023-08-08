import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import Spinner from "../../components/Spinner/Spinner";
import useAuth from "../../hooks/useAuth";


const MyGroups = () => {
    const [axiosSecure] = useAxiosSecure();
    const { user } = useAuth();

    const { data: groups = [], refetch, isLoading } = useQuery({
        queryKey: ['my-group', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/my-group/${user?.email}`);
            return res.data
        }
    })

    console.log(groups);

    const handleDelete = async (id, groupId) => {
        console.log(id);
        const res = await axiosSecure.delete(`/my-group/${id}?groupId=${groupId}`);
        console.log(res.data);
        if (res?.data?.modifiedCount) {
            refetch();
            toast.success(`Group Leave!`);
        }
    }


    return (
        <div>
            <h1 className="text-3xl font-bold text-sky-400 text-center mb-8">My Groups </h1>
            {
                isLoading && <Spinner />
            }
            {
                groups && Array.isArray(groups) && groups.length > 0 ? <div className="overflow-x-auto">
                    <table className="table text-md">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Group Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                groups.map((group) => (
                                    group.membersInfo && group.membersInfo.map((user, i) => (
                                        <tr key={user._id}>
                                            <td>
                                                {i + 1}
                                            </td>
                                            <td>
                                                {group?.groupName}
                                            </td>

                                            <td>

                                                <button
                                                    onClick={() => handleDelete(group?._id, user?._id)}
                                                    className="btn btn-secondary btn-xs ml-2">
                                                    Leave
                                                </button>
                                            </td>

                                        </tr>

                                    ))))
                            }

                        </tbody>
                    </table>
                </div> : ""
            }

        </div>

    );
};

export default MyGroups;