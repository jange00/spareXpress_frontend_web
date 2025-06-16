import { CartItemsList } from "./cartItemsList"
import { CartSummary } from "./cartSummary"
import { EmptyCart } from "./emptyCart"

export const CartContent = ({ cartItems, onQuantityChange, onRemoveItem, onSaveForLater, onClose }) => {
  return (
    <>
      <div className="flex-1 overflow-y-auto p-4 max-h-[calc(100vh-280px)]">
        {cartItems.length === 0 ? (
          <EmptyCart onClose={onClose} />
        ) : (
          <CartItemsList
            cartItems={cartItems}
            onQuantityChange={onQuantityChange}
            onRemoveItem={onRemoveItem}
            onSaveForLater={onSaveForLater}
          />
        )}
      </div>

      {cartItems.length > 0 && <CartSummary cartItems={cartItems} onClose={onClose} />}
    </>
  )
}