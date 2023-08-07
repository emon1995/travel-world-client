import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Spinner from "../Spinner/Spinner";


const Comments = () => {
    // get all data
    const { data: comments = [], isLoading } = useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/comments`);
            return res.data;
        }
    })

    return (
        <div>
            {
                isLoading && <Spinner />
            }
            {
                comments && Array.isArray(comments) && comments.length > 0 && comments.map((comment) => <div key={comment._id} className="flex items-center justify-start gap-3 h-20 p-4 rounded mb-4">
                    <div className="avatar">
                        <div className="w-12 rounded-full">
                            <img src={comment?.photoURL} alt="img" />
                        </div>
                    </div>
                    <p> {comment?.comments?.comment}</p>

                </div>)
            }
        </div>
    );
};

export default Comments;