import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [secs, setSecs] = useState(5);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setSecs((prev) => (prev - 1));
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  useEffect(() => {
    if (secs < 0) {
      navigate("/blogs");
    }
  }, [secs, navigate])

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center font-bold text-2xl">
      Welcome to Simple Blog App
      <div className="font-normal text-lg mt-2">Redirecting to feed in {Math.max(secs, 0)} seconds</div>
    </div>
  )
}

export default HomePage
