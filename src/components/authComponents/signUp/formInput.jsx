const FormInput = ({ id, type, label, value, onChange, required = true, icon: Icon, className = "" }) => {
    return (
      <div className={`relative ${className}`}>
        <input
          type={type}
          id={id}
          required={required}
          className="peer w-full px-4 py-3 rounded-lg border border-gray-300 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all duration-300"
          placeholder={label}
          value={value}
          onChange={onChange}
        />
        <label
          htmlFor={id}
          className="absolute left-4 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all duration-300
            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5
            peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#ffc107]"
        >
          {label}
        </label>
        {Icon && (
          <Icon className="absolute right-4 top-3.5 h-5 w-5 text-gray-400 peer-focus:text-[#ffc107] transition-colors duration-300" />
        )}
      </div>
    )
  }
  
  export default FormInput