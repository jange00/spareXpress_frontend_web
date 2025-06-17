export default function StatusBadge({ status }) {
    const getStatusColor = (status) => {
      switch (status) {
        case "successful":
          return "bg-green-100 text-green-800"
        case "pending":
          return "bg-yellow-100 text-yellow-800"
        case "failed":
          return "bg-red-100 text-red-800"
        case "refunded":
          return "bg-blue-100 text-blue-800"
        default:
          return "bg-gray-100 text-gray-800"
      }
    }
  
    const getStatusText = (status) => {
      switch (status) {
        case "successful":
          return "Successful"
        case "pending":
          return "Pending"
        case "failed":
          return "Failed"
        case "refunded":
          return "Refunded"
        default:
          return status
      }
    }
  
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(status)}`}>
        {getStatusText(status)}
      </span>
    )
  }
  