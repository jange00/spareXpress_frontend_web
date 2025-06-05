import { Truck, Shield, RotateCcw } from "lucide-react"

export default function ProductFeatures() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t">
      <div className="flex items-center space-x-3">
        <Truck className="w-10 h-10 text-yellow-500" />
        <div>
          <h4 className="font-semibold">Free Shipping</h4>
          <p className="text-sm text-gray-600">Orders over $99</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <Shield className="w-10 h-10 text-yellow-500" />
        <div>
          <h4 className="font-semibold">2 Year Warranty</h4>
          <p className="text-sm text-gray-600">Full coverage</p>
        </div>
      </div>
      <div className="flex items-center space-x-3">
        <RotateCcw className="w-10 h-10 text-yellow-500" />
        <div>
          <h4 className="font-semibold">30 Days Return</h4>
          <p className="text-sm text-gray-600">Money back guarantee</p>
        </div>
      </div>
    </div>
  )
}
