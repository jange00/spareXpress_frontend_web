import { Heart, Trash2, ArrowRight } from "lucide-react"

export const SavedItemsContent = ({ savedItems, setSavedItems, onMoveToCart }) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 max-h-[calc(100vh-200px)]">
      {savedItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full text-center p-6">
          <Heart className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-lg font-semibold text-[#212121] mb-2">No saved items</h3>
          <p className="text-gray-500 mb-6">Items you save for later will appear here</p>
        </div>
      ) : (
        <div className="space-y-4">
          {savedItems.map((item, index) => (
            <div key={item.id} className="flex border-b border-gray-200 pb-4">
              {/* Product Image */}
              <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                <img
                  src={item.image || "/placeholder.svg?height=80&width=80"}
                  alt={item.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>

              {/* Product Details */}
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium text-[#212121] line-clamp-2">{item.name}</h4>
                  <button
                    onClick={() => {
                      const newSavedItems = [...savedItems]
                      newSavedItems.splice(index, 1)
                      setSavedItems(newSavedItems)
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-sm text-gray-500 mb-2">{item.variant || ""}</div>

                <div className="flex justify-between items-center">
                  <span className="font-bold text-[#212121]">${item.price.toFixed(2)}</span>
                  <button
                    onClick={() => onMoveToCart(item, index)}
                    className="text-sm bg-[#ffc107] text-[#212121] px-3 py-1 rounded-full hover:bg-yellow-600 transition-colors flex items-center"
                  >
                    Move to Cart <ArrowRight className="w-3 h-3 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
