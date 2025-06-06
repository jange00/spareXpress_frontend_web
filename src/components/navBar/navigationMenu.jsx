import { ChevronDown } from "lucide-react"

const NavigationMenu = ({
  isVehicleDropdownOpen,
  setIsVehicleDropdownOpen,
  isComputerDropdownOpen,
  setIsComputerDropdownOpen,
}) => {
  const handleHomeClick = () => {
    window.location.href = "/"
    window.scrollTo(0, 0)
  }

  const menuItems = ["Vehicle Parts", "Computer Parts", "Best Sellers", "Deals"]

  return (
    <div className="hidden lg:flex space-x-8 text-[#212121] font-semibold mr-6">
      <button
        className="hover:text-[#424242] transition duration-300 ease-in-out cursor-pointer transform hover:scale-105"
        onClick={handleHomeClick}
      >
        Home
      </button>

      {menuItems.map((item, index) => (
        <div key={index} className="relative group">
          <button
            className="flex items-center space-x-1 hover:text-[#424242] group cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => {
              if (index === 0) setIsVehicleDropdownOpen(!isVehicleDropdownOpen)
              else if (index === 1) setIsComputerDropdownOpen(!isComputerDropdownOpen)
              else if (index === 2) window.location.href = "/best-sellers"
              else if (index === 3) window.location.href = "/deals"
            }}
          >
            {item}
            {(index === 0 || index === 1) && (
              <ChevronDown className="w-4 h-4 ml-1 group-hover:transform group-hover:rotate-180 transition-transform duration-300" />
            )}
          </button>
          {((index === 0 && isVehicleDropdownOpen) || (index === 1 && isComputerDropdownOpen)) && (
            <div className="absolute top-full left-0 bg-[#f5f5f5] shadow-lg rounded-md py-2 mt-1 w-64 opacity-0 cursor-pointer group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
              {["Option 1", "Option 2", "Option 3"].map((subItem, subIndex) => (
                <a
                  key={subIndex}
                  href="#"
                  className="block px-4 py-2 hover:bg-[#e0e0e0] text-[#212121] transition duration-200 ease-in-out transform hover:translate-x-2"
                >
                  {subItem}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default NavigationMenu
