import { Link } from "react-router-dom"

const LoginLink = () => {
  return (
    <div className="text-center">
      <Link to="/sign-in" className="text-[#212121] hover:text-[#ffc107] transition-colors duration-300">
        Already have an account? Sign in
      </Link>
    </div>
  )
}

export default LoginLink
