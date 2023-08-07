import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
// import { useNavigate } from "react-router-dom";


const CreateGroup = () => {
    const { user } = useAuth();
    // const navigate = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();
        console.log(user);

        const form = e.target;
        const name = form.name.value;

        if (!name) {
            toast.error("Please input group name");
        }
        else {
            fetch(`${import.meta.env.VITE_BASE_URL}/groups/${user.email}`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ groupName: name })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        console.log(data);
                        form.reset();
                        Swal.fire(
                            'Success!',
                            'Group create successfully',
                            'success'
                        )
                        // navigate(from, { replace: true });
                    }
                })
        }
    }

    return (
        <div>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col lg:flex-row-reverse">

                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Create Group</span>
                                </label>
                                <input type="text" name="name" placeholder="Group Name" className="input input-bordered" />
                            </div>

                            <div className="form-control mt-6">
                                <button className="btn bg-[#47B1E2] hover:text-black text-white">Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateGroup;