import { useState } from "react"
import { Menu } from "lucide-react"
import Logo from "./logo"
import SearchBar from "./searchBar"
import NavigationMenu from "./navigationMenu"
import UserActions from "./userActions"
import MobileMenu from "./mobileMenu"
import CartDropdown from "../cartDropdown/CartDropdown"
import { useGetCartByUserId } from "../../hook/admin/useCart/useGetCartByUserId"

// import CartDropdown from "../cartDropdown/cartDropdown"

const TopNavigationBar = () => {
  const {data: cartItem = [] } = useGetCartByUserId();
  const [searchQuery, setSearchQuery] = useState("")
  const [isVehicleDropdownOpen, setIsVehicleDropdownOpen] = useState(false)
  const [isComputerDropdownOpen, setIsComputerDropdownOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // const [isCartOpen, setIsCartOpen] = useState(false)

  // Sample cart items - in a real app, this would come from your cart state management
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Premium Brake Pads Set",
      price: 89.99,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
      variant: "Front Set",
    },
    {
      id: 2,
      name: "Engine Oil Filter",
      price: 24.99,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      variant: "Standard",
    },
  ])

  const handleQuantityChange = (id, newQuantity, isNewItem = false) => {
    if (newQuantity < 1) return

    if (isNewItem) {
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
          <Logo />

          <div className="flex-grow"></div>

          <NavigationMenu
            isVehicleDropdownOpen={isVehicleDropdownOpen}
            setIsVehicleDropdownOpen={setIsVehicleDropdownOpen}
            isComputerDropdownOpen={isComputerDropdownOpen}
            setIsComputerDropdownOpen={setIsComputerDropdownOpen}
          />

          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <UserActions
           isCartOpen={isCartOpen}
           onClose={() => setIsCartOpen(false)}
           cartItems={cartItem}
           onQuantityChange={handleQuantityChange}
           onRemoveItem={handleRemoveItem}
           getTotalItemCount={getTotalItemCount}
           setIsCartOpen={setIsCartOpen}
          />

          <button
            className="lg:hidden text-[#212121] hover:text-[#424242] transition duration-300 ease-in-out transform hover:scale-105"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-7 h-7" />
          </button>
        </div>

        <MobileMenu isMobileMenuOpen={isMobileMenuOpen} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </div>
    </nav>
  )
}

export default TopNavigationBar
