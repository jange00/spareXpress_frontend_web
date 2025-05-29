const CartDropdownItem = ({ item }) => (
    <div className="p-2 border-b">
      <div className="font-medium">{item.name}</div>
      <div className="text-sm text-gray-600">{item.price}</div>
    </div>
  );
  
  export default CartDropdownItem;
  