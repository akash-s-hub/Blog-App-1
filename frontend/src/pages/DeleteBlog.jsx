import { useEffect, useState } from 'react'
import axios from "axios";
import { MdDelete } from "react-icons/md";

const Blogs = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function deleteBlog(id) {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.delete(`${import.meta.env.VITE_API_URL}/blogs/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id))
    } catch (err) {
      console.error("Error: ", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchBlogs() {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/blogs`);
      setBlogs(response.data.blogs);
    } catch (e) {
      console.error(e.message);
      setError("Couldn't load blogs. Try refreshing the page.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchBlogs()
  }, [])



  if (loading) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center pt-16">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center pt-16">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    )
  }

  if (blogs.length === 0) {
    return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center pt-16 gap-1">
        <p className="text-slate-900 font-semibold">No blogs yet</p>
        <p className="text-sm text-slate-500">Create your first post to see it here.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 to-slate-100 pt-16">
      <div className="max-w-5xl mx-auto px-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white rounded-2xl border border-slate-100 shadow-lg shadow-slate-200/60 p-5 flex flex-col gap-2 cursor-pointer relative"
          >
            <div
              className='absolute h-10 w-10 right-0 top-0 flex justify-center items-center cursor-pointer bg-red-400'
              onClick={() => { deleteBlog(blog._id) }}>
              <MdDelete />
            </div>
            <h2 className="text-lg font-semibold text-slate-900 leading-snug">
              {blog.blogTitle}
            </h2>
            <p className="text-sm text-slate-500 line-clamp-3">
              {blog.blogDescription}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blogs