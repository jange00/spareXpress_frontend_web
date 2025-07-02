import { ShoppingCart, User } from "lucide-react"
import CartDropdown from "../cartDropdown/CartDropdown"
import ProfileOptions from "./profileOptions"
// import Cart from "../cartDropdown/Cart"

const UserActions = ({
  cartItems,
  isCartOpen,
  setIsCartOpen,
  getTotalItemCount,
  handleQuantityChange,
  handleRemoveItem,
}) => {
  const token=localStorage.getItem("token") 
  const handleLoginClick = () => {
    window.location.href = "/sign-in"
  }

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen)
  }

  return (
    <>
      <div className="flex items-center space-x-6 ml-6">
        {/* Login Button */}
        <button
            onClick={handleLoginClick}
            className="hidden md:flex items-center space-x-2 cursor-pointer text-[#212121] hover:text-[#424242] transition duration-300 ease-in-out transform hover:scale-105"
          >
            <User className="w-6 h-6" />
            <span className="font-semibold">Log in</span>
          </button>
        {/* {!token ? (
          <button
            onClick={handleLoginClick}
            className="hidden md:flex items-center space-x-2 cursor-pointer text-[#212121] hover:text-[#424242] transition duration-300 ease-in-out transform hover:scale-105"
          >
            <User className="w-6 h-6" />
            <span className="font-semibold">Log in</span>
          </button>
        ) : (
          <ProfileOptions/>
        )} */}
        {/* Cart Button */}
        <button
          onClick={handleCartClick}
          className="relative flex items-center space-x-2 cursor-pointer text-[#212121] hover:text-[#424242] transition duration-300 ease-in-out transform hover:scale-105"
        >
          <div className="relative">
            <ShoppingCart className="w-6 h-6" />
            {/* Cart Item Count Badge */}
            {getTotalItemCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#ffc107] text-[#212121] text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center min-w-[20px] shadow-md">
                {getTotalItemCount()}
              </span>
            )}
          </div>
          <span className="hidden md:block font-semibold">Cart</span>
        </button>
      </div>

      {/* Cart Dropdown */}
      <CartDropdown
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemoveItem}
      />
    </>
  )
}

export default UserActions
