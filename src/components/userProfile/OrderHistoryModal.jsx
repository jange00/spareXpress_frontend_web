import React from "react";
import { useGetOrdersByUserId } from "../../hook/admin/useOrder/useGetOrdersByUserId";
// import { useGetAllOrder } from "../../hook/admin/useOrder/useGetAllOrder";

const OrderHistoryModal = ({ onClose }) => {
  const { data : fetchOrder = [] } = useGetOrdersByUserId();
  // const { data : fetchOrders = [] } = useGetAllOrder();
  const handleCancelOrder = (orderId) => {
    alert(`Cancel requested for order: ${orderId}`);
  };

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

        {fetchOrder.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-lg mb-5 p-4 shadow-sm"
          >
            <div className="flex justify-between mb-2">
              <div>
                <p className="text-sm text-gray-500">Order ID: {order._id}</p>
                <p className="text-gray-700 font-medium">Date: {order.createdAt}</p>
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
