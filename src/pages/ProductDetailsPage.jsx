import { useParams, useLocation, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"

import ProductImageGallery from "../components/productDetailsComponents/ProductImageGallery"
import ProductInfo from "../components/productDetailsComponents/ProductInfo"
import ProductFeatures from "../components/productDetailsComponents/ProductFeatures"
import ProductTabs from "../components/productDetailsComponents/ProductTabs"
import RelatedProducts from "../components/productDetailsComponents/RelatedProducts"
import Breadcrumb from "../components/productDetailsComponents/Breadcrumb"
import LoadingSkeleton from "../components/productDetailsComponents/LoadingSkeleton"

const ProductDetailsPage = () => {
  const { productId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { productData: initialProductData } = location.state || {}
  const [productData, setProductData] = useState(initialProductData || [])
  const [loading, setLoading] = useState(!initialProductData)
  const [relatedProducts, setRelatedProducts] = useState([])

  // Fetch product data if not provided in location state
  useEffect(() => {
    if (!initialProductData) {
      const fetchProductData = async () => {
        setLoading(true)
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1000))

          // Sample product data
          const sampleProduct = {
            id: productId,
            name: `Product ${productId}`,
            category: "vehicle-parts",
            subcategory: "Engine",
            brand: "Toyota",
            model: `Model-${1000 + Number(productId)}`,
            price: 299.99,
            originalPrice: 349.99,
            rating: 4.5,
            reviews: 128,
            image: "/placeholder.svg?height=500&width=500",
            description:
              "High-quality component for optimal performance. This premium product is designed to provide reliable and long-lasting service for your vehicle.",
            stock: 15,
            discount: 14,
            inStock: true,
            specifications: {
              Material: "Premium Alloy",
              Dimensions: "10 x 8 x 4 inches",
              Weight: "2.5 lbs",
              Warranty: "2 Years",
              Compatibility: "Most Toyota models 2015-2023",
              "Country of Origin": "Japan",
            },
            features: [
              "Enhanced durability",
              "Precision engineered",
              "Easy installation",
              "Improved performance",
              "Reduced noise",
            ],
            compatibility: ["Toyota Camry 2018-2023", "Toyota Corolla 2019-2023", "Toyota RAV4 2020-2023"],
          }

          setProductData(sampleProduct)
        } catch (error) {
          console.error("Error fetching product data:", error)
        } finally {
          setLoading(false)
        }
      }

      fetchProductData()
    }
  }, [initialProductData, productId])

  // // Fetch related products
  useEffect(() => {
    if (productData) {
      const fetchRelatedProducts = async () => {
        try {
          // Simulate API call
          // await new Promise((resolve) => setTimeout(resolve, 500))

          // Generate sample related products
          const sampleRelatedProducts = Array.from({ length: 4 }, (_, i) => ({
            id: 100 + i,
            name: `${productData.brand} ${productData.subcategory} ${i + 1}`,
            category: productData.category,
            subcategory: productData.subcategory,
            brand: productData.brand,
            price: Math.floor(Math.random() * 300) + 100,
            originalPrice: Math.floor(Math.random() * 400) + 150,
            rating: (Math.random() * 1.5 + 3.5).toFixed(1),
            reviews: Math.floor(Math.random() * 100) + 10,
            image: "/placeholder.svg?height=300&width=300",
            discount: Math.floor(Math.random() * 20) + 5,
            inStock: Math.random() > 0.2,
          }))

          setRelatedProducts(sampleRelatedProducts)
          console.log(RelatedProducts);
        } catch (error) {
          console.error("Error fetching related products:", error)
        }
      }

      fetchRelatedProducts()
    }
  }, [productData])

  const handleBuyNow = (quantity) => {
    navigate("/checkout", {
      state: {
        productData,
        quantity,
      },
    })
  }

  // Generate multiple images for the gallery
  const productImages = productData ? Array(4).fill(productData.image) : []

  if (loading) {
    return <LoadingSkeleton />
  }

  if (!productData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-6">{"The product you're looking for doesn't exist or has been removed."}</p>
            <Link
              to="/products"
              className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold inline-flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-12">
      <div className="container mx-auto px-4">
        <Breadcrumb product={productData} />

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductImageGallery images={productImages} productName={productData.name} />
            <div>
              <ProductInfo product={productData} onBuyNow={handleBuyNow} />
              <ProductFeatures />
            </div>
          </div>
        </div>

        <ProductTabs product={productData} />

        <div className="mt-8">
          <RelatedProducts products={relatedProducts} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetailsPage
