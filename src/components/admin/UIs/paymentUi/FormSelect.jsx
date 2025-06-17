import { Field, ErrorMessage } from "formik"

export default function FormSelect({ name, label, options, placeholder, required = false, className = "" }) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      <Field
        as="select"
        id={name}
        name={name}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>

      <ErrorMessage name={name} component="div" className="text-red-500 text-sm mt-1" />
    </div>
  )
}
