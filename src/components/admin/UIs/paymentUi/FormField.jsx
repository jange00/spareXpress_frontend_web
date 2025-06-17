import { Field, ErrorMessage } from "formik"

export default function FormField({
  name,
  label,
  type = "text",
  placeholder,
  icon,
  required = false,
  step,
  min,
  max,
  rows,
  className = "",
}) {
  const baseInputClasses = `
    w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
    focus:outline-none focus:ring-2 focus:ring-yellow-300 focus:border-yellow-500
    disabled:bg-gray-50 disabled:text-gray-500
  `

  const iconInputClasses = icon ? "pl-10" : "pl-3"

  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            {icon}
          </div>
        )}

        {type === "textarea" ? (
          <Field
            as="textarea"
            id={name}
            name={name}
            rows={rows || 3}
            placeholder={placeholder}
            className={`${baseInputClasses} ${iconInputClasses}`}
          />
        ) : (
          <Field
            type={type}
            id={name}
            name={name}
            placeholder={placeholder}
            step={step}
            min={min}
            max={max}
            className={`${baseInputClasses} ${iconInputClasses}`}
          />
        )}
      </div>

      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
  )
}
