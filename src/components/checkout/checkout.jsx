import { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import KhaltiCheckout from "khalti-checkout-web";
import { ArrowLeft } from "lucide-react"
// Import components
import { OrderSummaryComponent } from "./orderSummary"
import { DeliveryAddress } from "./deliveryAddress"
import { ShippingMethodComponent } from "./shippingMethod"
import { PaymentMethodComponent } from "./paymentMethod"
import { CouponSection } from "./couponSection"
import { SuccessPage } from "./successPage"
import { AddItemsModal } from "./addItemsModal"
import CryptoJS from "crypto-js";
import {v4 as uuidv4} from "uuid"

// Import data and utilities
import {
  sampleProducts,
  sampleAddresses,
  shippingMethods,
  paymentMethods,
  availableCoupons,
  availableProducts,
} from "./sampleData"
import { calculateOrderSummary } from "./calculations"

const CheckoutPage = () => {
  // Main checkout state
  const location = useLocation();
const { productData, quantity } = location.state || {};

const initialCart = productData
  ? [{ ...productData, id: productData._id || productData.id, quantity }]
  : sampleProducts;

const [cartItems, setCartItems] = useState(initialCart);

  const [addresses, setAddresses] = useState(sampleAddresses)
  const [selectedAddress, setSelectedAddress] = useState(addresses.find((addr) => addr.isDefault) || addresses[0])
  const [selectedShipping, setSelectedShipping] = useState(shippingMethods[0])
  const [paymentOptions, setPaymentOptions] = useState(paymentMethods)
  const [selectedPayment, setSelectedPayment] = useState(paymentOptions.find((p) => p.isDefault) || paymentOptions[0])
  const [coupons, setCoupons] = useState(availableCoupons)
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [showAddItemsModal, setShowAddItemsModal] = useState(false)

  // Checkout flow state
  const [checkoutStep, setCheckoutStep] = useState("checkout")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  // UI state
  const [cvvConfirmation, setCvvConfirmation] = useState("")
  const [cvvError, setCvvError] = useState("")
  const [expandedSections, setExpandedSections] = useState({
    orderSummary: true,
    address: true,
    shipping: true,
    payment: true,
    coupon: true,
  })
  useEffect(() => {
    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty. Redirecting to products.");
      window.location.href = "/products";
    }
  }, [cartItems]);
  

  // Generate order number when order is complete
  useEffect(() => {
    if (orderComplete) {
      setOrderNumber(`ORD-${Math.floor(100000 + Math.random() * 900000)}`)
    }
  }, [orderComplete])

  // Get current order summary
  const orderSummary = calculateOrderSummary(cartItems, selectedShipping, appliedCoupon)

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  const handleRemoveItem = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    })
  }

  const handleAddressSelect = (address) => {
    setSelectedAddress(address)
  }

  const handleShippingSelect = (method) => {
    setSelectedShipping(method)
  }

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method)
    setCvvConfirmation("")
    setCvvError("")
  }

  const handleApplyCoupon = (code) => {
    const coupon = coupons.find((c) => c.code === code)
    if (coupon) {
      setAppliedCoupon(coupon)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
  }

  const handleAddToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id)

    if (existingProduct) {
      handleQuantityChange(product.id, existingProduct.quantity + 1)
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

      // Khalti payment handling
      const handleKhaltiPayment = async() => {
        let checkout = new KhaltiCheckout({
            // replace this key with yours
            publicKey: 'test_public_key_617c4c6fe77c441d88451ec1408a0c0e',
            
            productIdentity: "1234567890",
            productName: "Furniture Fusion",
            productUrl: "http://localhost:3000",
            eventHandler: {
              onSuccess(payload) {
                // hit merchant api for initiating verfication
                console.log(payload);
                let data = {
                  "token": payload.token,
                  "amount": payload.price
                };
                
                let config = {
                  headers: {'Authorization': 'test_secret_key_3f78fb6364ef4bd1b5fc670ce33a06f5'}
                };
                
                axios.post('https://khalti.com/api/v2/payment/verify/', data, config)
                .then(response => {
                  console.log(response.data);
                  
                })
                .catch(error => {
                  console.log(error);
                });
               
              },
              // onError handler is optional
              onError(error) {
                // handle errors
                console.log(error);
              },
              onClose() {
                console.log("widget is closing");
              },
            },
            paymentPreference: [
              "KHALTI",
              "EBANKING",
              "MOBILE_BANKING",
              "CONNECT_IPS",
              "SCT",
            ],
          });
        checkout.show({ amount: orderSummary.total  * 100 });
       
    };

    const handleEsewaPayment = () => {
      // setIsProcessing(true)
    
      const transaction_uuid = uuidv4(); // or use uuid v4 if required
      console.log(transaction_uuid)
      const product_code = "EPAYTEST"
      const total_amount = cartItems[0].price.toFixed(2) // You must match this exactly as in the string
      const signed_field_names = "total_amount,transaction_uuid,product_code"
    
      const signingString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`
      const secret = "8gBm/:&EnhH.1/q" // ← UAT secret key from eSewa. DO NOT USE IN PRODUCTION FRONTEND.
    
      const signature = CryptoJS.HmacSHA256(signingString, secret).toString(CryptoJS.enc.Base64)
    
      const fields = {
        amount: cartItems[0].price.toFixed(2),
        tax_amount: "0",
        total_amount: total_amount,
        transaction_uuid: transaction_uuid,
        product_code: product_code,
        product_service_charge: "0",
        product_delivery_charge: "0",
        success_url: "https://developer.esewa.com.np/success",
        failure_url: "https://developer.esewa.com.np/failure",
        signed_field_names: signed_field_names,
        signature: signature,
      }
    
      const form = document.createElement("form")
      form.setAttribute("method", "POST")
      form.setAttribute("action", "https://rc-epay.esewa.com.np/api/epay/main/v2/form")
    
      Object.entries(fields).forEach(([key, value]) => {
        const input = document.createElement("input")
        input.setAttribute("type", "hidden")
        input.setAttribute("name", key)
        input.setAttribute("value", value)
        form.appendChild(input)
      })
    
      document.body.appendChild(form)
      form.submit()
    }

    

  const handleCheckout = () => {
    console.log(selectedPayment.type)
    if (cartItems.length === 0) {
      alert("Your cart is empty")
      return
    }

    if (selectedPayment.type === "card" && !cvvConfirmation) {
      setCvvError("Please enter your CVV to confirm payment")
      return
    }
    if (selectedPayment.type === "khalti" ) {
      handleKhaltiPayment()
      // setCvvError("Please enter your CVV to confirm payment")
      return
    }
    if (selectedPayment.type === "esewa" ) {
      handleEsewaPayment()
      // setCvvError("Please enter your CVV to confirm payment")
      return
    }

    if (selectedPayment.type === "card" && cvvConfirmation.length < 3) {
      setCvvError("Please enter a valid CVV")
      return
    }

    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setOrderComplete(true)
      setCheckoutStep("success")
    }, 2000)
  }

  const handleContinueShopping = () => {
    // Navigate back to shopping
    window.history.back()
  }

  const handleViewOrderDetails = () => {
    alert(`Navigating to order details for ${orderNumber}...`)
  }

  const renderCheckoutButton = () => {
    return (
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden mb-6 p-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              By placing your order, you agree to our{" "}
              <a href="#" className="text-[#FFB800] hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#FFB800] hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
          <div className="flex items-center">
            <button
              onClick={() => window.history.back()}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 mr-3"
            >
              <ArrowLeft className="w-4 h-4 mr-1 inline" />
              Return to Cart
            </button>
            <button
              onClick={handleCheckout}
              disabled={isProcessing || cartItems.length === 0}
              className={`px-6 py-3 bg-[#FFB800] text-black font-medium rounded-md hover:bg-[#FFB800]/90 flex items-center ${
                isProcessing || cartItems.length === 0 ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isProcessing ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>Confirm & Pay ${orderSummary.total}</>
              )}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 mt-18">
      <div className="container mx-auto px-4">
        {/* Checkout Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {checkoutStep === "success" ? "Order Confirmation" : "Checkout"}
          </h1>
          {checkoutStep !== "success" && (
            <p className="text-gray-600">Complete your purchase by providing the necessary information below.</p>
          )}
        </div>

        {/* Main Content */}
        {checkoutStep === "success" ? (
          <SuccessPage
            orderNumber={orderNumber}
            orderSummary={orderSummary}
            selectedShipping={selectedShipping}
            onContinueShopping={handleContinueShopping}
            onViewOrderDetails={handleViewOrderDetails}
          />
        ) : (
          <>
            <OrderSummaryComponent
              cartItems={cartItems}
              orderSummary={orderSummary}
              isExpanded={expandedSections.orderSummary}
              onToggle={() => toggleSection("orderSummary")}
              onQuantityChange={handleQuantityChange}
              onRemoveItem={handleRemoveItem}
              onAddMoreItems={() => setShowAddItemsModal(true)}
              onContinueShopping={handleContinueShopping}
            />
            <DeliveryAddress
              addresses={addresses}
              selectedAddress={selectedAddress}
              isExpanded={expandedSections.address}
              onToggle={() => toggleSection("address")}
              onAddressSelect={handleAddressSelect}
            />
            <ShippingMethodComponent
              shippingMethods={shippingMethods}
              selectedShipping={selectedShipping}
              isExpanded={expandedSections.shipping}
              onToggle={() => toggleSection("shipping")}
              onShippingSelect={handleShippingSelect}
            />
            <PaymentMethodComponent
              paymentOptions={paymentOptions}
              selectedPayment={selectedPayment}
              isExpanded={expandedSections.payment}
              onToggle={() => toggleSection("payment")}
              onPaymentSelect={handlePaymentSelect}
              cvvConfirmation={cvvConfirmation}
              setCvvConfirmation={setCvvConfirmation}
              cvvError={cvvError}
            />
            <CouponSection
              coupons={coupons}
              appliedCoupon={appliedCoupon}
              isExpanded={expandedSections.coupon}
              onToggle={() => toggleSection("coupon")}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
            />
            {renderCheckoutButton()}
          </>
        )}
      </div>
      <AddItemsModal
        isOpen={showAddItemsModal}
        onClose={() => setShowAddItemsModal(false)}
        availableProducts={availableProducts}
        onAddToCart={handleAddToCart}
      />
    </div>
  )
}

export default CheckoutPage
