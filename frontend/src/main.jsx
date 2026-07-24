import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Blogs from './pages/Blogs.jsx';
import CreateBlog from './pages/CreateBlog.jsx';
import PageNotFound from './pages/PageNotFound.jsx';
import Layout from './components/Layout.jsx';
import ShowBlog from './pages/ShowBlog.jsx';

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:blogid" element={<ShowBlog />} />
        <Route path="create-blog" element={<CreateBlog />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter >
)
