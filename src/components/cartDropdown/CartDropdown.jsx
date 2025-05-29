import CartDropdownItem from "./CartDropdownItem";

const CartDropdown = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-md p-2">
        <p className="text-center text-sm text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-md p-2">
      {items.map((item, index) => (
        <CartDropdownItem key={index} item={item} />
      ))}
      <button className="mt-2 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-1 px-2 rounded">
        Go to Cart
      </button>
    </div>
  );
};

export default CartDropdown;
