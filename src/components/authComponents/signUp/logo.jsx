import { Link } from "react-router-dom"

const Logo = () => {
  return (
    <Link className="inline-block mb-6 transform hover:scale-105 transition-transform duration-300">
      <h1 className="text-4xl font-extrabold text-[#212121] tracking-wider">
        Spare<span className="text-[#ffc107] animate-pulse">Xpress</span>
      </h1>
    </Link>
  )
}

export default Logo
