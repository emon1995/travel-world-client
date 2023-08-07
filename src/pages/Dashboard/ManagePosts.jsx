import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import Spinner from "../../components/Spinner/Spinner";


const ManagePosts = () => {
    const [axiosSecure] = useAxiosSecure();
    // console.log(itemId);

    const { data: posts = [], refetch, isLoading } = useQuery({
        queryKey: ['manage-posts'],
        queryFn: async () => {
            const res = await axiosSecure.get("/manage-posts");
            return res.data
        }
    })

    console.log(posts);

    const handleMakeStatus = async (item, status) => {
        console.log(item, status);
        const res = await axiosSecure.patch(`/manage-posts/${item._id}?status=${status}`);
        console.log(res.data);
        if (res.data.modifiedCount) {
            refetch();
            toast.success(`${item.className} is an ${status} now!`);
        }
    }


    return (
        <div>
            <h1 className="text-3xl font-bold text-sky-400 text-center mb-8">Manage Posts </h1>
            {
                isLoading && <Spinner />
            }
            {
                posts && Array.isArray(posts) && posts.length > 0 ? <div className="overflow-x-auto">
                    <table className="table text-md">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    #
                                </th>
                                <th>Post Image & Name</th>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                posts.map((item, i) => (
                                    <tr key={item._id}>
                                        <td>
                                            {i + 1}
                                        </td>
                                        <td>
                                            <div className="flex items-center space-x-3">
                                                <div className="avatar">
                                                    <div className="mask mask-squircle w-12 h-12">
                                                        <img src={item?.postImage} alt="Avatar Tailwind CSS Component" />
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="font-bold">{item?.title}</div>

                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            {item?.postUserName}
                                        </td>
                                        <td>
                                            {item?.postUserEmail}
                                        </td>
                                        <td >
                                            <span className={`${item?.status === "pending" && "badge badge-primary badge-outline"} ${item?.status === "approved" && "badge badge-secondary badge-outline"} ${item?.status === "denied" && "badge badge-error badge-outline"}`}>{item?.status}</span>
                                        </td>
                                        <td>
                                            <button disabled={item?.status === "denied" || item?.status === "approved"} onClick={() => handleMakeStatus(item, "approved")} className="btn btn-secondary btn-xs">Approved</button>
                                            <button disabled={item?.status === "denied" || item?.status === "approved"} onClick={() => handleMakeStatus(item, "denied")} className="btn btn-primary btn-xs ml-2">Denied</button>
                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>
                    </table>
                </div> : ""
            }


        </div>

    );
};

export default ManagePosts;