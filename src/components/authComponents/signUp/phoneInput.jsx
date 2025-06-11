import { ChevronDown, Phone } from "lucide-react"

const PhoneInput = ({ countryCode, onCountryCodeChange, phone, onPhoneChange, countryCodes }) => {
  return (
    <div className="relative flex">
      <select
        value={countryCode}
        onChange={onCountryCodeChange}
        className="absolute left-0 top-0 w-20 h-full px-2 border-r border-gray-300 bg-gray-50 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-[#ffc107] appearance-none cursor-pointer"
      >
        {countryCodes.map((country) => (
          <option key={country.code} value={country.code}>
            {country.code}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute left-14 top-4 h-4 w-4 text-gray-400 pointer-events-none" />
      <input
        type="tel"
        id="phone"
        required
        className="peer w-full pl-24 pr-4 py-3 rounded-lg border border-gray-300 placeholder-transparent focus:outline-none focus:ring-2 focus:ring-[#ffc107] focus:border-transparent transition-all duration-300"
        placeholder="Phone Number"
        value={phone}
        onChange={onPhoneChange}
      />
      <label
        htmlFor="phone"
        className="absolute left-24 -top-2.5 bg-white px-1 text-sm text-gray-600 transition-all duration-300
          peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-3.5
          peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-[#ffc107]"
      >
        Phone Number
      </label>
      <Phone className="absolute right-4 top-3.5 h-5 w-5 text-gray-400 peer-focus:text-[#ffc107] transition-colors duration-300" />
    </div>
  )
}

export default PhoneInput
