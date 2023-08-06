import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import useAuth from "../../hooks/useAuth";

const SocialLogin = () => {
    const { google } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location?.state?.from?.pathname || "/";

    const handleSocialLogin = () => {
        google()
            .then(result => {
                const savedUser = {
                    name: result?.user?.displayName,
                    email: result?.user?.email,
                    photoURL: result?.user?.photoURL,
                    role: "student",
                    admin: false
                }
                fetch(`${import.meta.env.VITE_BASE_URL}/users`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(savedUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        Swal.fire(
                            'Success!',
                            'User login successfully',
                            'success'
                        )
                        navigate(from, { replace: true });

                    })
            })
    }

    return (
        <span onClick={handleSocialLogin} className="w-10 h-10 items-center justify-center inline-flex cursor-pointer rounded-full font-bold text-lg border-2 border-white">G+</span>
    );
};

export default SocialLogin;