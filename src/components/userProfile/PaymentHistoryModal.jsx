import React from "react";
import { useGetPaymentByUserId } from "../../hook/admin/usePayment/useGetPaymentByUserId";

const PaymentHistoryModal = ({ onClose }) => {
  const {data: fetchPayment = [] } = useGetPaymentByUserId();

  const dummyPayments = [
    {
      _id: "1",
      amount: 2500,
      paymentMethod: "Credit Card",
      paymentStatus: "Completed",
      createdAt: "2025-07-09T10:00:00Z",
    },
    {
      _id: "2",
      amount: 1700,
      paymentMethod: "Esewa",
      paymentStatus: "Pending",
      createdAt: "2025-07-08T14:30:00Z",
    },
  ];

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
        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {fetchPayment.map((payment) => (
            <div
              key={payment._id}
              className="p-4 bg-gray-50 rounded-md border border-gray-200 shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="font-semibold text-gray-700">
                  {payment.paymentMethod}
                </div>
                <div
                  className={`text-sm font-medium ${
                    payment.paymentStatus === "Completed"
                      ? "text-green-600"
                      : payment.paymentStatus === "Pending"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {payment.paymentStatus}
                </div>
              </div>
              <div className="text-sm text-gray-500">
                Amount: NPR {payment.amount}
              </div>
              <div className="text-xs text-gray-400">
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
