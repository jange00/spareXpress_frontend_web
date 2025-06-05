import { useState } from "react"

export default function ProductImageGallery({ images, productName }) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="space-y-4">
      <div className="aspect-square rounded-lg overflow-hidden border border-gray-200">
        <img
          src={images[selectedImage] || "/placeholder.svg?height=500&width=500"}
          alt={productName}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImage === index ? "border-yellow-500" : "border-transparent hover:border-gray-300"
            }`}
          >
            <img
              src={image || "/placeholder.svg?height=150&width=150"}
              alt={`${productName} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}
