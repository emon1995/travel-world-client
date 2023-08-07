
import { useQuery } from '@tanstack/react-query';
import './App.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

function App() {
  const { data: posts = [] } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts`);
      return res.data;
    }
  })

  return (
    <>
      <div className="flex items-center justify-center flex-col mb-4 container mx-auto">
        {
          posts && Array.isArray(posts) && posts.length > 0 && posts.map((post) => <div key={post._id} className="card lg:card-side w-full bg-base-100 shadow-xl">
            <figure><img className='object-cover' src={post?.postImage} alt="Album" /></figure>
            <div className="card-body">
              <h2 className="card-title">{post?.title}</h2>
              <p>{post?.description}</p>
              <Link to={`/single-post/${post._id}`} className="card-actions justify-end">
                <button className="btn btn-primary">Details</button>
              </Link>
            </div>
          </div>)
        }
      </div>
    </>
  )
}

export default App
