
import { ShoppingCart } from "lucide-react";

const CartIcon = ({ itemCount, toggleDropdown }) => {
  return (
    <div onClick={toggleDropdown} className="relative cursor-pointer">
      <ShoppingCart />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
