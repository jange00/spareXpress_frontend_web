
import { useState } from "react"
import { ShoppingCart, User, Search, ChevronDown, Menu } from "lucide-react"
import CartDropdown from "../cartDropdown/CartDropdown"
import CartDropdownItem from "../cartDropdown/CartDropdownItem"
import Cart from "../cartDropdown/Cart"

const TopNavigationBar = () => {
  const [searchQuery, setSearchQuery] = useState("")
  const [isVehicleDropdownOpen, setIsVehicleDropdownOpen] = useState(false)
  const [isComputerDropdownOpen, setIsComputerDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Sample cart items - in a real app, this would come from your cart state management
  const [cartItems, setCartItems] = useState([
    {
      id: "p1",
      name: "Premium Brake Pads",
      price: 49.99,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "p2",
      name: "Oil Filter",
      price: 12.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
    {
      id: "p3",
      name: "Spark Plugs (Set of 4)",
      price: 24.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
    },
  ])

  const handleHomeClick = () => {
    // Navigate to homepage
    window.location.href = "/"
    window.scrollTo(0, 0) // Scroll to the top of the page
  }

  const handleLoginClick = () => {
    // Navigate to sign-in page
    window.location.href = "/sign-in"
  }

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen)
  }

  // Update the handleQuantityChange function to support adding new items
  const handleQuantityChange = (id, newQuantity, isNewItem = false) => {
    if (newQuantity < 1) return

    if (isNewItem) {
      // This is a simplified approach for adding a new item
      // In a real app, you'd have more product details
      const newItem = {
        id: id,
        name: "New Item",
        price: 29.99,
        quantity: newQuantity,
        image: "/placeholder.svg?height=80&width=80",
      }
      setCartItems([...cartItems, newItem])
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const getTotalItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <nav className="bg-[#ffc107] shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1
            className="text-3xl font-extrabold text-[#212121] tracking-wider cursor-pointer hover:text-[#424242] transition duration-300 ease-in-out transform hover:scale-105"
            onClick={handleHomeClick}
          >
            Spare<span className="text-red-600">X</span>press
          </h1>

          {/* Spacer */}
          <div className="flex-grow"></div>

          {/* Category Menu */}
          <div className="hidden lg:flex space-x-8 text-[#212121] font-semibold mr-6">
            {/* Home Button */}
            <button
              className="hover:text-[#424242] transition duration-300 ease-in-out cursor-pointer transform hover:scale-105"
              onClick={handleHomeClick}
            >
              Home
            </button>

            {["Vehicle Parts", "Computer Parts", "Best Sellers", "Deals"].map((item, index) => (
  <div key={index} className="relative group">
    <button
      className="flex items-center space-x-1 hover:text-[#424242] group cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 "
      onClick={() => {
        if (index === 0) setIsVehicleDropdownOpen(!isVehicleDropdownOpen)
        else if (index === 1) setIsComputerDropdownOpen(!isComputerDropdownOpen)

          //////////
        else if (index === 2) window.location.href = "/best-sellers"
      else if (index === 3) window.location.href = "/deals"
      /////////
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

          {/* Enhanced Search Bar */}
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

          {/* Icons */}
          <div className="flex items-center space-x-6 ml-6">
            <button
              onClick={handleLoginClick}
              className="hidden md:flex items-center space-x-2 cursor-pointer text-[#212121] hover:text-[#424242] transition duration-300 ease-in-out transform hover:scale-105"
            >
              <User className="w-6 h-6" />
              <span className="font-semibold">Log in</span>
            </button>
            <button
              className="relative text-[#212121] hover:text-[#424242] cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleCartClick}
            >
              <ShoppingCart className="w-7 h-7" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full border-2 border-[#212121] font-bold animate-pulse">
                {getTotalItemCount()}
              </span>
            </button>
            <button
              className="lg:hidden text-[#212121] hover:text-[#424242] transition duration-300 ease-in-out transform hover:scale-105"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-[#f5f5f5] rounded-lg border-2 border-[#212121] shadow-lg">
            {["Vehicle Parts", "Computer Parts", "Best Sellers", "Deals"].map((item, index) => (
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
      </div>

      {/* <div className="flex justify-end p-4 bg-gray-100">
      <Cart />
    </div> */}
    </nav>
  )
}

export default TopNavigationBar
