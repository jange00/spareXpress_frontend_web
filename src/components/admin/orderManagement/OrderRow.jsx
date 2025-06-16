import Badge from "../UIs/productUI/Badge"
import ActionDropdown from "../UIs/ActionDropdown"
import { formatDate, getPaymentMethodLabel } from "../utils//orders/formatters"

const OrderRow = ({ order, isSelected, onSelect, onView, onUpdateStatus }) => {
  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: "yellow", label: "Pending" },
      processing: { color: "blue", label: "Processing" },
      shipped: { color: "indigo", label: "Shipped" },
      delivered: { color: "green", label: "Delivered" },
      cancelled: { color: "red", label: "Cancelled" },
    }

    const config = statusConfig[status] || { color: "gray", label: status }
    return <Badge color={config.color}>{config.label}</Badge>
  }

  const getPaymentStatusBadge = (status) => {
    if (status === "paid") return <span className="text-green-600">Paid</span>
    if (status === "refunded") return <span className="text-orange-600">Refunded</span>
    return <span className="text-gray-600">Pending</span>
  }

  const actionItems = [
    { label: "View Order", action: onView, icon: "eye" },
    { label: "Update Status", action: () => onUpdateStatus(order._id, "processing"), icon: "refresh" },
    { label: "Print Invoice", action: () => console.log("Print invoice"), icon: "printer" },
    { label: "Cancel Order", action: () => onUpdateStatus(order._id, "cancelled"), icon: "trash", danger: true },
  ]

  return (
    <tr className="hover:bg-gray-50">
      <td className="px-6 py-4 whitespace-nowrap">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
        />
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{order._id}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{order.customer?.name}</div>
        <div className="text-sm text-gray-500">{order.customer?.email}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{formatDate(order.createdAt)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">${order.Amount?.toFixed(2)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(order.status)}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{getPaymentMethodLabel(order.paymentMethod)}</div>
        <div className="text-sm text-gray-500">{getPaymentStatusBadge(order.paymentStatus)}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        <ActionDropdown items={actionItems} />
      </td>
    </tr>
  )
}

export default OrderRow
