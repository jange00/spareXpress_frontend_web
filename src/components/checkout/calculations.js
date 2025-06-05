export const calculateOrderSummary = (cartItems, selectedShipping, appliedCoupon) => {
    // Calculate subtotal from all cart items
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  
    // Apply coupon discount if available
    let discount = 0
    if (appliedCoupon) {
      if (appliedCoupon.type === "percentage") {
        // If coupon has category restrictions, only apply to matching items
        if (appliedCoupon.categories) {
          const eligibleSubtotal = cartItems
            .filter((item) => appliedCoupon.categories.includes(item.category))
            .reduce((total, item) => total + item.price * item.quantity, 0)
  
          discount = (eligibleSubtotal * appliedCoupon.discount) / 100
        } else {
          // Apply to all items
          discount = (subtotal * appliedCoupon.discount) / 100
        }
      } else if (appliedCoupon.type === "fixed") {
        discount = appliedCoupon.discount
      }
    }
  
    // Calculate shipping cost (free if free_shipping coupon is applied)
    const shippingCost = appliedCoupon?.type === "free_shipping" ? 0 : selectedShipping.price
  
    // Calculate tax (after discounts)
    const tax = (subtotal - discount) * 0.08 // 8% tax rate
  
    // Calculate total
    const total = subtotal - discount + shippingCost + tax
  
    return {
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      shipping: shippingCost.toFixed(2),
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      itemCount: cartItems.reduce((count, item) => count + item.quantity, 0),
    }
  }
  