import { useState } from "react";
import CartIcon from "./CartIcon";
import CartDropdown from "./CartDropdown";

const Cart = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { name: "Tea", price: "$2.50" },
    { name: "Coffee", price: "$3.00" },
  ]);

  const toggleDropdown = () => setDropdownOpen(!isDropdownOpen);

  return (
    <div className="relative">
      <CartIcon itemCount={cartItems.length} toggleDropdown={toggleDropdown} />
      {isDropdownOpen && <CartDropdown items={cartItems} />}
    </div>
  );
};

export default Cart;
