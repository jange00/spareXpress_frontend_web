export const RecommendedProducts = () => {
    // Sample recommended products
    const recommendedProducts = [
      {
        id: "rec1",
        name: "Windshield Wipers",
        price: 19.99,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "rec2",
        name: "Air Filter",
        price: 14.99,
        image: "/placeholder.svg?height=80&width=80",
      },
      {
        id: "rec3",
        name: "Headlight Bulbs",
        price: 29.99,
        image: "/placeholder.svg?height=80&width=80",
      },
    ]
  
    return (
      <div className="mt-6">
        <h3 className="font-medium text-[#212121] mb-3">Frequently Bought Together</h3>
        <div className="grid grid-cols-3 gap-2">
          {recommendedProducts.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg p-2 hover:border-[#ffc107] transition-colors cursor-pointer"
            >
              <div className="w-full h-16 bg-gray-100 rounded-md mb-2 flex items-center justify-center">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain p-1"
                />
              </div>
              <div className="text-xs font-medium line-clamp-2 mb-1">{product.name}</div>
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold">${product.price.toFixed(2)}</span>
                <button className="text-xs bg-[#212121] text-white px-2 py-1 rounded-full hover:bg-[#424242] transition-colors">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  