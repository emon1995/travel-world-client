import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import useAuth from "../../hooks/useAuth";
import Swal from 'sweetalert2'
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import { useState } from "react";
import { BiShow, BiHide } from 'react-icons/bi';


const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { logIn } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const from = location?.state?.from?.pathname || "/";

    const toggleButton = () => {
        setShowPassword(!showPassword);
        return;
    }

    const onSubmit = data => {

        logIn(data.email, data.password)
            .then(result => {
                console.log(result.user);
                reset();
                Swal.fire(
                    'Success!',
                    'User create successfully',
                    'success'
                )
                navigate(from, { replace: true });
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
                                <input {...register("email", { required: true })} type="email" name="email" id="email" placeholder="Email" className="block w-full p-4 text-lg rounded-sm bg-black" />
                                {
                                    errors.email && (<span className="text-red-600">Email is Required</span>)
                                }
                            </div>
                            <div className="pb-2 pt-4 relative">
                                <input {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/, })} className="block w-full p-4 text-lg rounded-sm bg-black" type={`${showPassword ? "text" : "password"}`} name="password" id="password" placeholder="Password" />
                                <p onClick={toggleButton} className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 cursor-pointer">
                                    {
                                        showPassword ? < BiShow /> : <BiHide />
                                    }
                                </p>

                            </div>
                            {
                                errors.password?.type === "required" && (<span className="text-red-600">Password is Required</span>)
                            }


                            <div className="px-4 pb-2 pt-4">
                                <button type="submit" value="sign in" className="uppercase block w-full p-4 text-lg rounded-full bg-[#47B1E2] hover:bg-[#51b7e6] focus:outline-none">sign in</button>
                            </div>
                        </form>
                        <p>Don&apos;t have an account? <Link className="text-blue-400" to={`/signup`}>create account</Link></p>
                    </div>
                </div>
            </section>

        </div>

    );
};

export default Login;