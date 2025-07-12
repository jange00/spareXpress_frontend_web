import React from "react";
import { useGetOrdersByUserId} from "../../hook/admin/useOrder/useGetOrdersByUserId"

// Step 1: Accept `userId` as a prop
const OrderHistoryModal = ({ userId, onClose }) => {
  console.log('userId received by Modal:', userId); 
  // Step 2: Pass the `userId` to the hook
  const { data: fetchOrder = [], isLoading, error } = useGetOrdersByUserId(userId);
  console.log({
    hook_userId_param: userId,
    hook_isLoading: isLoading,
    hook_error: error,
    hook_data: fetchOrder
  });

  const handleCancelOrder = (orderId) => {
    alert(`Cancel requested for order: ${orderId}`);
  };

  // Good Practice: Handle loading and error states
  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 backdrop-blur-sm p-4 flex items-center justify-center">
        <div className="bg-white w-full max-w-3xl rounded-xl p-6 text-center">
          <p className="text-lg font-semibold">Loading order history...</p>
        </div>
      </div>
    );
  }

  if (error) {
     return (
      <div className="fixed inset-0 z-50 backdrop-blur-sm p-4 flex items-center justify-center">
        <div className="bg-white w-full max-w-3xl rounded-xl p-6 text-center">
          <p className="text-lg font-semibold text-red-600">Failed to load orders.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50  backdrop-blur-sm p-4 flex items-center justify-center">
      <div className="bg-white w-full max-w-3xl rounded-xl shadow-2xl p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">🧾 Order History</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✖
          </button>
        </div>
        
        {/* Good Practice: Handle case where there are no orders */}
        {fetchOrder.length === 0 && !isLoading && (
          <p className="text-center text-gray-500 py-8">You have no past orders.</p>
        )}

        {fetchOrder.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-lg mb-5 p-4 shadow-sm"
          >
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                {/* Improvement: Format the date */}
                <p className="text-gray-700 font-medium">Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-700">
                  Total: Rs.{order.amount}
                </p>
                <p
                  className={`text-xs mt-1 font-medium ${
                    order.status === "Delivered"
                      ? "text-green-600"
                      : order.status === "Pending"
                      ? "text-yellow-600"
                      : "text-gray-500"
                  }`}
                >
                  Status: {order.status}
                </p>
              </div>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between border-b pb-1 last:border-none"
                >
                  <span>{item.name} × {item.quantity}</span>
                  <span>Rs.{item.total.toFixed(2)}</span>
                </div>
              ))}
            </div>

            {order.status === "Pending" && (
              <div className="text-right mt-4">
                <button
                  className="px-4 py-1.5 rounded bg-red-100 text-red-700 hover:bg-red-200 text-sm"
                  onClick={() => handleCancelOrder(order._id)}
                >
                  Cancel Order
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistoryModal;