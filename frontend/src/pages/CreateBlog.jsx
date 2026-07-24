import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const CreateBlog = () => {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    setError(null)
    setIsSubmitting(true)

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/create-blog`, data)
      navigate("/blogs")
      e.target.reset();
    } catch (e) {
      console.error(e.message)
      setError("Couldn't create the blog. Try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-br from-slate-50 to-slate-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 p-8"
      >
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-slate-900">
            Create a new blog
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Give your post a title and a short description to get started.
          </p>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="blogTitle"
              className="text-sm font-medium text-slate-700"
            >
              Blog title
            </label>
            <input
              type="text"
              name="title"
              id="blogTitle"
              placeholder="e.g. 10 tips for better sleep"
              required
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="blogDescription"
              className="text-sm font-medium text-slate-700"
            >
              Blog description
            </label>
            <textarea
              name="description"
              id="blogDescription"
              placeholder="A one or two sentence summary of your post"
              rows={3}
              required
              className="w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 -mt-2">{error}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-lg bg-blue-600 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 active:scale-[0.99] cursor-pointer shadow-sm shadow-blue-600/30 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100"
          >
            {isSubmitting ? "Creating..." : "Create blog"}
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateBlog