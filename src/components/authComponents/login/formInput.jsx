export const FormInput = ({ id, type, label, placeholder, value, onChange, required = false }) => {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-800 mb-1">
          {label}
        </label>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          required={required}
          className="block w-full px-5 py-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:border-transparent transition"
          value={value}
          onChange={onChange}
        />
      </div>
    )
  }
  