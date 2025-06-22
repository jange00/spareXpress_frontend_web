export default function StatusBadge({ status }) {
    const getStatusColor = (status) => {
      switch (status) {
        case "active":
          return "bg-green-100 text-green-800"
        case "inactive":
          return "bg-red-100 text-red-800"
        case "draft":
          return "bg-yellow-100 text-yellow-800"
        default:
          return "bg-gray-100 text-gray-800"
      }
    }
  
    const getStatusText = (status) => {
      switch (status) {
        case "active":
          return "Active"
        case "inactive":
          return "Inactive"
        case "draft":
          return "Draft"
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
  