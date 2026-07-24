import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShowBlog = () => {
  const { blogid } = useParams();
  const [blog, setBlog] = useState({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function getNote() {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:3000/blogs/${blogid}`);
      setBlog(response.data.blog);
    } catch (err) {
      console.error("Error: ", err);
      setError("Couldn't load blogs. Try refreshing the page.");
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getNote();
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

  return (
    <div className="pt-16 px-5 h-screen w-full">
      <h2 className="mt-2 font-bold text-3xl mb-5">{blog.blogTitle}</h2>
      <p>{blog.blogDescription}</p>
    </div>
  )
}

export default ShowBlog
