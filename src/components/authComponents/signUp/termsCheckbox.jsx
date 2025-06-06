import { Link } from "react-router-dom"

const TermsCheckbox = ({ checked, onChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        id="terms"
        className="w-4 h-4 rounded border-gray-300 text-[#ffc107] focus:ring-[#ffc107] transition-colors duration-300"
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor="terms" className="text-sm text-gray-600">
        I agree to the{" "}
        <Link to="/terms" className="text-[#ffc107] hover:text-[#ffcd38] underline">
          Terms & Conditions
        </Link>
      </label>
    </div>
  )
}

export default TermsCheckbox
