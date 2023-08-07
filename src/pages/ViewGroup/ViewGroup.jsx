import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";


const ViewGroup = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const img_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_KEY}`;

    // get all data
    const { data: group = {}, } = useQuery({
        queryKey: ['groups'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/group/${id}`);
            return res.data;
        }
    })

    const onsubmit = data => {
        const formData = new FormData();
        formData.append('image', data.fileUpload[0]);

        fetch(img_url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgRes => {
                console.log(imgRes);
                const imgURL = imgRes.data.display_url;
                const { title, email, name, description } = data;
                const postItem = {
                    title, postUserEmail: email, postUserName: name, description, date: new Date(), postImage: imgURL, status: "pending",
                    postUserImage: user?.photoURL
                };

                axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, postItem)
                    .then(res => {
                        console.log(res.data);
                        reset();
                        Swal.fire({
                            position: 'top',
                            icon: 'success',
                            title: 'Post successfully added & review by admin',
                            showConfirmButton: false,
                            timer: 1500
                        })

                    })
            })
        // console.log(data);
    }

    return (
        <div>
            <h1>{group.groupName}</h1>
            <div >
                {/* component */}
                <section className="max-w-4xl p-6 mx-auto bg-[#283a5ae6] rounded-md shadow-md mt-20">
                    <h1 className="text-xl font-bold text-white capitalize ">Add a Post</h1>
                    <form onSubmit={handleSubmit(onsubmit)}>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label className="text-white" htmlFor="name">Name</label>
                                <input {...register("name", { required: true })} readOnly value={user?.displayName} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md -600 focus:border-blue-500 0 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="text-white" htmlFor="emailAddress">Email Address</label>
                                <input {...register("email", { required: true })} readOnly value={user?.email} type="email" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500 focus:outline-none focus:ring" />
                            </div>
                            <div>
                                <label className="text-white" htmlFor="title">Title</label>
                                <input {...register("title", { required: true })} type="text" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md  focus:border-blue-500 focus:outline-none focus:ring" />
                                {
                                    errors.title && (<span className="text-red-600">title is Required</span>)
                                }
                            </div>

                            <div>
                                <label className="text-white" htmlFor="description">Description</label>
                                <textarea {...register("description", { required: true })} type="number" className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md focus:border-blue-500 focus:outline-none focus:ring" />
                                {
                                    errors.description && (<span className="text-red-600">description is Required</span>)
                                }
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white">
                                    Image
                                </label>
                                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                                    <div className="space-y-1 text-center">
                                        <svg className="mx-auto h-12 w-12 text-white" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <div className="flex text-sm text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                                                <span className>Upload a file</span>
                                                <input {...register("fileUpload", { required: true })} id="file-upload" name="fileUpload" type="file" className="sr-only" />
                                            </label>

                                        </div>

                                    </div>
                                </div>
                                {
                                    errors.fileUpload && (<span className="text-red-600">Image is Required</span>)
                                }
                            </div>

                        </div>
                        <div className="flex justify-end mt-6">
                            <button type="submit" value="Add" className="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-[#47B1E2] hover:bg-[#51b7e6] rounded-md focus:outline-none focus:bg-gray-600">Post</button>
                        </div>
                    </form>
                </section>
                {/* component */}


            </div>
        </div>
    );
};

export default ViewGroup;