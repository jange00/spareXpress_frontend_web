import { Search } from "lucide-react"

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="hidden md:flex items-center flex-1 max-w-md">
      <div className="relative w-full group">
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
  )
}

export default SearchBar
