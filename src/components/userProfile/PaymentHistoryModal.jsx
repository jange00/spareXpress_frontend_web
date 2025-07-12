import React from "react";
import { useGetPaymentByUserId } from "../../hook/admin/usePayment/useGetPaymentByUserId";

// Step 1: Accept `userId` as a prop
const PaymentHistoryModal = ({ userId, onClose }) => {
  // Step 2: Pass the received `userId` to the hook
  const { data: fetchPayment = [], isLoading, error } = useGetPaymentByUserId(userId);

  // Note: The dummyPayments array is no longer needed as we are fetching real data.

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
        <div className="bg-white rounded-xl w-full max-w-3xl p-6 shadow-xl text-center">
          <p className="text-lg font-semibold">Loading payment history...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
        <div className="bg-white rounded-xl w-full max-w-3xl p-6 shadow-xl text-center">
          <p className="text-lg font-semibold text-red-600">Failed to load payments.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-xl w-full max-w-3xl p-6 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">💳 Payment History</h2>
          <button
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            ✖
          </button>
        </div>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto p-1">
          {/* Step 3: Add a message for when there are no payments */}
          {fetchPayment.length === 0 && !isLoading && (
            <div className="text-center text-gray-500 py-8">
              You have no payment history.
            </div>
          )}

          {fetchPayment.map((payment) => (
            <div
              key={payment._id}
              className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                    <p className="font-semibold text-gray-700">{payment.paymentMethod}</p>
                    <p className="text-xs text-gray-400 mt-1">Payment ID: {payment._id}</p>
                </div>
                <div className="text-right">
                    <p className="font-semibold text-lg text-gray-800">Rs. {payment.amount}</p>
                    <div
                      className={`text-xs mt-1 px-2 py-0.5 rounded-full inline-block ${
                        payment.paymentStatus === "Completed"
                          ? "bg-green-100 text-green-700"
                          : payment.paymentStatus === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {payment.paymentStatus}
                    </div>
                </div>
              </div>
              <div className="text-xs text-gray-500 border-t pt-2 mt-2">
                Date: {new Date(payment.createdAt).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentHistoryModal;