import { Search } from "lucide-react"

const MobileMenu = ({ isMobileMenuOpen, searchQuery, setSearchQuery }) => {
  const menuItems = ["Vehicle Parts", "Computer Parts", "Best Sellers", "Deals"]

  return (
    <>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden mt-4 bg-[#f5f5f5] rounded-lg border-2 border-[#212121] shadow-lg">
          {menuItems.map((item, index) => (
            <a
              key={index}
              href="#"
              className="block px-4 py-2 text-[#212121] font-semibold hover:bg-[#e0e0e0] transition duration-200 ease-in-out"
            >
              {item}
            </a>
          ))}
        </div>
      )}

      {/* Mobile Search Bar */}
      <div className="mt-4 md:hidden">
        <div className="relative">
          <input
            type="text"
            placeholder="Search for parts..."
            className="w-full p-3 pl-12 pr-20 rounded-full border-2 border-[#212121] focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-white text-[#212121] shadow-inner transition duration-300 ease-in-out"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-600" />
          <button className="absolute right-2 top-2 bg-[#212121] text-[#ffc107] px-4 py-1 rounded-full hover:bg-[#424242] transition duration-300 ease-in-out transform group-hover:scale-105 shadow-md">
            Search
          </button>
        </div>
      </div>
    </>
  )
}

export default MobileMenu
