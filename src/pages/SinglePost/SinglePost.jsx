import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Comments from "../../components/Comments/Comments";
import Spinner from "../../components/Spinner/Spinner";


const SinglePost = () => {
    const { user } = useAuth();
    const { id } = useParams();
    // const [groups, setGroups] = useState([]);
    // const [isJoin, setIsJoin] = useState(false);

    // get all data
    const { data: post = {}, isLoading, refetch } = useQuery({
        queryKey: ['post'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/post/${id}`);
            return res.data;
        }
    })

    // comment handle
    const handleComment = e => {
        e.preventDefault();
        const form = e.target;
        const comment = form.comment.value;
        console.log(comment);
        if (comment) {
            fetch(`${import.meta.env.VITE_BASE_URL}/comments`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ comments: { comment }, ...user })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    toast.success("comment added");
                    refetch();
                    form.reset();
                })
                .catch(err => {
                    toast.error(err.message);
                })
        } else {
            toast.error("please input comment");
        }
    }


    return (
        <div className="flex items-center justify-center flex-col mb-4 container mx-auto">
            {
                isLoading && <Spinner />
            }
            <img src={post.postImage} alt="img" />
            <p className="my-4 text-3xl font-bold">Title: {post.title}</p>
            <p className="my-4 text-2xl font-bold">Post User Name: {post.postUserName}</p>
            <p className="my-4 text-xl font-bold">Post User Email: {post.postUserEmail}</p>
            <p>Description: {post?.description}</p>

            <div className="mt-8 text-xl font-bold">
                <p className="mb-4">Comments:</p>
                <form onSubmit={handleComment}>
                    <input type="text" name="comment" placeholder="comment" className="input input-bordered input-info w-full max-w-xs" />
                    <button className="btn mt-2">Comment</button>
                </form>
            </div>
            <div className="mt-6">
                <Comments />
            </div>
        </div>
    );
};

export default SinglePost;