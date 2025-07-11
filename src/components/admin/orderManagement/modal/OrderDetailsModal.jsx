import { useState } from "react";
import { Button } from "../../UIs/orderUi/Button1";
import { PrinterIcon, TruckIcon, RefreshIcon } from "../../icons/Icons";

// API hooks
import { useGetAllOrder } from "../../../../hook/admin/useOrder/useGetAllOrder";
import { useGetAllProduct } from "../../../../hook/admin/useProduct/useGetAllProduct";
import { useGetAllShippingAddress } from "../../../../hook/admin/useShippingAddress/useGetAllShippingAddress";
import { useGetAllPayment } from "../../../../hook/admin/usePayment/useGetAllPayment";

// Mock functions
const printInvoice = (order, user, items, shippingAddress, payment) => {
  console.log("Printing invoice for:", {
    order,
    user,
    items,
    shippingAddress,
    payment,
  });
  // In a real app, you would use a library like react-to-print or generate a PDF.
  alert("Invoice data sent to console. See developer tools.");
};

const generateTrackingId = (id) => `TRACK-${id.slice(-6).toUpperCase()}`;

export const OrderDetailsModal = ({ order, onClose, onUpdate, onDelete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("details");

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // ✅ Fetch all data needed for the modal
  const { data: orderData } = useGetAllOrder();
  const { data: products = [] } = useGetAllProduct();
  const { data: shippingData } = useGetAllShippingAddress();
  const { data: paymentData } = useGetAllPayment();

  // Safely extract data arrays, defaulting to an empty array to prevent errors
  const allShippingAddresses = Array.isArray(shippingData?.data) ? shippingData.data : [];
  const allPayments = Array.isArray(paymentData?.data) ? paymentData.data : [];

  // Find the full user object associated with the order
  const user =
    typeof order.userId === "object"
      ? order.userId
      : orderData?.find((o) => o._id === order._id)?.userId;

  const userId = user?._id || (typeof order.userId === 'object' ? order.userId._id : order.userId);

  // Find the shipping address for this order
  const shippingAddress =
    allShippingAddresses.find((addr) => addr._id === order.shippingAddressId) ||
    allShippingAddresses.find((addr) => addr.userId?._id === userId); // Adjusted to check nested userId

  // Find payment info
  const payment =
    allPayments.find((pay) => pay.orderId === order._id) ||
    allPayments.find((pay) => pay.userId === userId);

  // This function now handles both populated and unpopulated product IDs
  const getProduct = (productIdOrObject) => {
    if (typeof productIdOrObject === 'object' && productIdOrObject !== null) {
      return productIdOrObject; // It's already the product object
    }
    return products.find((p) => p._id === productIdOrObject); // It's an ID, so find it
  };

  // --- Event Handlers ---

  const handlePrintInvoice = () => {
    setIsLoading(true);
    try {
      printInvoice(order, user, order.items, shippingAddress, payment);
      setTimeout(() => setIsLoading(false), 1000);
    } catch (e) {
      console.error("Print failed:", e);
      alert("Print failed");
      setIsLoading(false);
    }
  };

  const handleTrackPackage = () => {
    setIsLoading(true);
    const trackingUrl = `https://example-courier.com/track/${generateTrackingId(order._id)}`;
    window.open(trackingUrl, "_blank");
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleRefreshOrder = () => {
    setIsLoading(true);
    setTimeout(() => {
      alert("Order refreshed!");
      setIsLoading(false);
    }, 800);
  };

  const handleUpdateOrder = () => {
    setIsLoading(true);
    setTimeout(() => {
      onUpdate(order._id);
      alert("Order updated!");
      setIsLoading(false);
    }, 600);
  };

  const handleDeleteOrder = async () => {
    if (window.confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      setIsLoading(true);
      try {
        // This calls the function passed down from OrderManagement.jsx
        await onDelete(order._id); 
        onClose(); // Close the modal on success
      } catch (error) {
        console.error("Delete operation failed:", error);
        // The error alert will be handled by the hook in the parent
      } finally {
        // This ensures the loading spinner always turns off
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-md flex items-center justify-center z-40 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex-shrink-0 flex justify-between items-center border-b border-gray-200 px-6 py-4">
          <h2 className="text-xl font-bold text-gray-900">
            Order Details: {order._id}
          </h2>
          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm" onClick={handleRefreshOrder} disabled={isLoading}>
              <RefreshIcon className="w-4 h-4 mr-1" />
              {isLoading ? "Refreshing..." : "Refresh"}
            </Button>
            <Button variant="secondary" size="sm" onClick={handlePrintInvoice} disabled={isLoading}>
              <PrinterIcon className="w-4 h-4 mr-1" />
              {isLoading ? "Printing..." : "Print Invoice"}
            </Button>
          </div>
        </div>

        {/* Order date */}
        <div className="flex-shrink-0 px-6 py-2 border-b border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-500">
            Order created on {formatDate(order.createdAt)}
            {order.updatedAt !== order.createdAt && (
              <span className="ml-2">
                • Last updated {formatDate(order.updatedAt)}
              </span>
            )}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex-shrink-0 flex border-b border-gray-200">
          {[
            { key: "details", label: "Order Details" },
            { key: "items", label: "Order Items" },
            { key: "shipping", label: "Shipping Information" },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`px-4 py-2 font-medium text-sm ${
                activeTab === tab.key
                  ? "text-[#FFB800] border-b-2 border-[#FFB800]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-grow p-6 overflow-y-auto">
          {activeTab === "details" && (
            <div className="space-y-6">
              {/* Customer Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Customer Information</h3>
                  <div className="text-sm">
                    <p>Fullname: {user?.fullname || "N/A"}</p>
                    <p>Email: {user?.email || "N/A"}</p>
                    <p>Phone: {user?.phoneNumber || "N/A"}</p>
                    <p className="text-gray-500">User ID: {userId || "N/A"}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Order Summary</h3>
                  <p>Total Amount: Rs.{order.Amount}</p>
                  <p>Items Count: {order.items.length}</p>
                </div>
              </div>

              <hr className="border-gray-200" />

              {/* Shipping and Payment */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <h3 className="font-medium text-gray-900">Shipping Address</h3>
                  {shippingAddress ? (
                    <div className="text-sm text-gray-800 space-y-1">
                      <p>{shippingAddress.streetAddress}</p>
                      <p>{shippingAddress.city}, {shippingAddress.district}</p>
                      <p>{shippingAddress.province} - {shippingAddress.postalCode}</p>
                      <p>{shippingAddress.country}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">No address found for this order.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === "items" && (
            <div className="rounded-md border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Product</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item, index) => {
                    const product = getProduct(item.productId);
                    const unitPrice = product ? product.price : (item.total / item.quantity || 0);
                    return (
                      <tr key={index}>
                        {/* --- START: FIXED CODE --- */}
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {product?.name || item.productId}
                          </div>
                        </td>
                        {/* --- END: FIXED CODE --- */}
                        <td className="px-6 py-4 text-sm text-right">Rs.{unitPrice.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm text-right">{item.quantity}</td>
                        <td className="px-6 py-4 text-sm text-right font-medium">Rs.{item.total.toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "shipping" && (
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">Tracking Info</h3>
              <p>Tracking ID: {generateTrackingId(order._id)}</p>
              <p>Status: In Transit</p>
              <p>
                Estimated Delivery:{" "}
                {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString()}
              </p>
              <Button onClick={handleTrackPackage} disabled={isLoading}>
                <TruckIcon className="w-5 h-5 mr-1" />
                {isLoading ? "Opening..." : "Track Package"}
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 flex justify-between border-t border-gray-200 px-6 py-4">
          <Button variant="danger" onClick={handleDeleteOrder} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete Order"}
          </Button>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleUpdateOrder} disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Order"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};