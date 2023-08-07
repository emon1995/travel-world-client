import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Spinner from "../../components/Spinner/Spinner";


const ManageGroups = () => {
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [itemId, setItemId] = useState("");
    // console.log(itemId);

    const { data: groups = [], refetch, isLoading } = useQuery({
        queryKey: ['groups'],
        queryFn: async () => {
            const res = await axiosSecure.get("/groups");
            return res.data
        }
    })

    // console.log(groups);

    const handleDelete = async (id) => {
        console.log(id);
        const res = await axiosSecure.delete(`/manage-group/${id}`);
        if (res.data.modifiedCount) {
            refetch();
            toast.success(`Group Deleted`);
        }
    }

    const onsubmit = async (data) => {
        console.log(data.edit);
        const res = await axiosSecure.patch(`/manage-group/edit/${itemId}`, { groupName: data.edit });
        console.log(res.data);
        if (res.data.modifiedCount) {
            refetch();
            reset();
            toast.success(`Group Update`);
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-sky-400 text-center mb-8">Manage Groups </h1>
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
                                groups.map((item, i) => (
                                    <tr key={item._id}>
                                        <td>
                                            {i + 1}
                                        </td>
                                        <td>
                                            {item?.groupName}
                                        </td>

                                        <td>
                                            <button
                                                onClick={() => {
                                                    window.my_modal_3.showModal();
                                                    setItemId(item?._id);
                                                }}
                                                className="btn btn-accent btn-xs ml-2">
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(item?._id)}
                                                className="btn btn-secondary btn-xs ml-2">
                                                Delete
                                            </button>
                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>
                    </table>
                </div> : ""
            }

            <dialog id="my_modal_3" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <form method="dialog" >
                        <button htmlFor="my-modal-3" className="btn btn-sm btn-circle btn-error absolute right-2 top-2">✕</button>

                    </form>
                    <h1>Edit</h1>
                    <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col gap-4 ">
                        <textarea {...register("edit", { required: true })} className="textarea mt-8 textarea-info" placeholder="Group name"></textarea>
                        {
                            errors.edit && (<span className="text-red-600">Field is Required</span>)
                        }
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            </dialog>

        </div>

    );
};

export default ManageGroups;