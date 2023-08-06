import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2'
import SocialLogin from "../../components/SocialLogin/SocialLogin";


const SignUp = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { registerUser, profileName } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location?.state?.from?.pathname || "/";

    const onSubmit = data => {
        // if (data.email === "" || data.password === "") {
        //     toast.error("Empty field!");
        //     return;
        // }

        if (data.password !== data.confirmPassword) {
            toast.error("Password not matched!");
            return;
        }

        registerUser(data.email, data.password)
            .then(result => {
                console.log(result.user);
                profileName(data.name, data.photoURL)
                    .then(() => {
                        const savedUser = { name: data.name, email: data.email, photoURL: data.photoURL, role: "student", admin: false, phone: data.phone };
                        fetch(`${import.meta.env.VITE_BASE_URL}/users`, {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(savedUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();
                                    Swal.fire(
                                        'Success!',
                                        'User create successfully',
                                        'success'
                                    )
                                    navigate(from, { replace: true });
                                }
                            })
                    })
            })
            .catch(err => {
                toast.error(err.message);
                console.log(err);
            })
    };

    return (
        <div className="-mt-11">
            {/* component */}
            <section className="min-h-screen flex items-stretch text-white ">
                <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)' }}>
                    <div className="absolute bg-black opacity-60 inset-0 z-0" />
                    <div className="w-full px-24 z-10">
                        <h1 className="text-5xl font-bold text-left tracking-wide">Keep it special</h1>
                        <p className="text-3xl my-4">Capture your personal memory in unique way, anywhere.</p>
                    </div>

                </div>
                <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0" style={{ backgroundColor: '#161616' }}>
                    <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80)' }}>
                        <div className="absolute bg-black opacity-60 inset-0 z-0" />
                    </div>
                    <div className="w-full py-6 z-20">

                        <div className="py-6 space-x-2">
                            <SocialLogin />
                        </div>
                        <p className="text-gray-100">
                            or use email your account
                        </p>
                        <form onSubmit={handleSubmit(onSubmit)} className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
                            <div className="pb-2 pt-4">
                                <input {...register("name", { required: true })} type="text" name="name" id="name" placeholder="Name" className="block w-full p-4 text-lg rounded-sm bg-black" />
                                {
                                    errors.name && (<span className="text-red-600">Name is Required</span>)
                                }
                            </div>
                            <div className="pb-2 pt-4">
                                <input {...register("email", { required: true })} type="email" name="email" id="email" placeholder="Email" className="block w-full p-4 text-lg rounded-sm bg-black" />
                                {
                                    errors.email && (<span className="text-red-600">Email is Required</span>)
                                }
                            </div>
                            <div className="pb-2 pt-4">
                                <input {...register("phone", { required: true })} type="number" name="phone" id="phone" placeholder="Phone" className="block w-full p-4 text-lg rounded-sm bg-black" />
                                {
                                    errors.phone && (<span className="text-red-600">Phone is Required</span>)
                                }
                            </div>
                            <div className="pb-2 pt-4">
                                <input {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, })} className="block w-full p-4 text-lg rounded-sm bg-black" type="password" name="password" id="password" placeholder="Password" />
                                {
                                    errors.password?.type === "required" && (<span className="text-red-600">Password is Required</span>)
                                }
                                {
                                    errors.password?.type === "minLength" && (<span className="text-red-600">Password must be 6 characters</span>)
                                }
                                {
                                    errors.password?.type === "maxLength" && (<span className="text-red-600">Password must be less than 20 characters</span>)
                                }
                                {
                                    errors.password?.type === "pattern" && (<span className="text-red-600">Password must have one uppercase, lowercase, number & special char</span>)
                                }
                            </div>
                            <div className="pb-2 pt-4">
                                <input {...register("confirmPassword", { required: true })} className="block w-full p-4 text-lg rounded-sm bg-black" type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm Password" />
                                {
                                    errors.confirmPassword && (<span className="text-red-600">Confirm Password is Required</span>)
                                }
                            </div>
                            <div className="pb-2 pt-4">
                                <input {...register("photoURL", { required: true })} className="block w-full p-4 text-lg rounded-sm bg-black" type="text" name="photoURL" id="photoURL" placeholder="Photo URL" />
                                {
                                    errors.photoURL && (<span className="text-red-600">PhotoURL is Required</span>)
                                }
                            </div>

                            <div className="px-4 pb-2 pt-4">
                                <button type="submit" value="sign up" className="uppercase block w-full p-4 text-lg rounded-full bg-[#47B1E2] hover:bg-[#51b7e6] focus:outline-none">sign up</button>
                            </div>
                        </form>
                        <p>Already have an account? <Link className="text-blue-400" to={`/login`}>Login now</Link></p>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default SignUp;