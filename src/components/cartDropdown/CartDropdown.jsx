import { useState, useEffect, useRef } from "react"
import { CartHeader } from "./cartHeader"
import { CartTabs } from "./cartTabs"
import { CartContent } from "./cartContent"
import { SavedItemsContent } from "./savedItemsContent"
import { Notification } from "./notification"

import { useGetCartByUserId } from "../../hook/admin/useCart/useGetCartByUserId"

const CartDropdown = ({ isOpen, onClose, cartItems = [], onQuantityChange, onRemoveItem }) => {
  const { data: cart = [], refetch } = useGetCartByUserId();
  const [isVisible, setIsVisible] = useState(isOpen)
  const [activeTab, setActiveTab] = useState("cart")
  const [savedItems, setSavedItems] = useState([])
  const dropdownRef = useRef(null)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMessage, setNotificationMessage] = useState("")
  useEffect(() => {
    if (isOpen) {
      refetch(); // ✅ manually fetch when cart is opened
    }
  }, [isOpen, refetch]);
  
  console.log("Fetched cart data:", cart);
  
  

  // Handle outside clicks
  useEffect(() => {
    
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  // Animation handling
  useEffect(() => {
    if (isOpen) {
      setIsVisible(true)
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleSaveForLater = (item) => {
    // Remove from cart
    if (onRemoveItem) {
      onRemoveItem(item.id)
    }

    // Add to saved items
    setSavedItems([...savedItems, item])
    displayNotification("Item saved for later")
  }

  const handleMoveToCart = (item, index) => {
    // Add to cart
    if (onQuantityChange) {
      // Check if item already exists in cart
      const existingItem = cartItems.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        onQuantityChange(item.id, existingItem.quantity + 1)
      } else {
        // This is a simplified approach - in a real app you'd have a proper addToCart function
        const newItem = { ...item, quantity: 1 }
        onQuantityChange(newItem.id, newItem.quantity, true)
      }
    }

    // Remove from saved items
    const newSavedItems = [...savedItems]
    newSavedItems.splice(index, 1)
    setSavedItems(newSavedItems)
    displayNotification("Item moved to cart")
  }

  const displayNotification = (message) => {
    setNotificationMessage(message)
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
    }, 3000)
  }

  
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity < 1) return

    const updatedCart = cartItemsState.map((item) =>
      item._id === id ? { ...item, quantity: newQuantity } : item
    )
    setCartItemsState(updatedCart)
    displayNotification("Quantity updated")
  }

  const handleRemoveItem = (id) => {
    if (onRemoveItem) {
      onRemoveItem(id)
      displayNotification("Item removed from cart")
    }
  }

  if (!isVisible) return null

  return (
    <>
      <Notification show={showNotification} message={notificationMessage} />

      <div
        className={`fixed top-0 right-0 h-full w-full md:w-[420px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        ref={dropdownRef}
      >
        <CartHeader cartItemsCount={cartItems.length} onClose={onClose} />

        <CartTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          cartItemsCount={cartItems.length}
          savedItemsCount={savedItems.length}
        />

        {activeTab === "cart" && (
          <CartContent
            cartItems={cart}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
            onSaveForLater={handleSaveForLater}
            onClose={onClose}
          />
        )}

        {activeTab === "saved" && (
          <SavedItemsContent savedItems={savedItems} setSavedItems={setSavedItems} onMoveToCart={handleMoveToCart} />
        )}
      </div>
    </>
  )
}

export default CartDropdown
