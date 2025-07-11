import { Package, ShoppingCart, Users, DollarSign, AlertTriangle } from "lucide-react"

// Sample data for charts
export const salesData = [
  { name: "Jan", revenue: 4000, lastYear: 2400 },
  { name: "Feb", revenue: 3000, lastYear: 1398 },
  { name: "Mar", revenue: 9800, lastYear: 2000 },
  { name: "Apr", revenue: 3908, lastYear: 2780 },
  { name: "May", revenue: 4800, lastYear: 1890 },
  { name: "Jun", revenue: 3800, lastYear: 2390 },
  { name: "Jul", revenue: 5000, lastYear: 3490 },
]

export const categoryData = [
  { name: "Auto Parts", value: 35 },
  { name: "Electronics", value: 25 },
  { name: "Tools", value: 20 },
  { name: "Accessories", value: 15 },
  { name: "Other", value: 5 },
]

export const orderStatusData = [
  { name: "Pending", value: 24, color: "#FFB800" },
  { name: "Shipped", value: 45, color: "#3498db" },
  { name: "Delivered", value: 78, color: "#2ecc71" },
  { name: "Cancelled", value: 12, color: "#e74c3c" },
]

// export const metrics = [
//   { id: "products", label: "Total Products", icon: Package, value: "1,245" },
//   { id: "orders", label: "Total Orders", icon: ShoppingCart, value: "320" },
//   { id: "customers", label: "Total Customers", icon: Users, value: "1,250" },
//   { id: "revenue", label: "Total Revenue", icon: DollarSign, value: "$42,450" },
//   { id: "lowstock", label: "Low Stock Alerts", icon: AlertTriangle, value: "8 Products" },
// ]

export const products = [
  {
    id: 1,
    name: "High-Performance Brake Pads",
    category: "Auto Parts",
    subcategory: "Brake Systems",
    brand: "Brembo",
    model: "BP-X1200",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.8,
    reviews: 156,
    image: "/placeholder.svg?height=300&width=300",
    badge: "Best Seller",
    description: "Premium ceramic brake pads for superior stopping power",
    stock: 15,
    discount: 28,
    inStock: true,
    specifications: {
      material: "Ceramic",
      position: "Front",
      fitment: "Universal",
      warranty: "2 Years",
      dimensions: "12x8x4 inches",
      weight: "4.5 lbs",
    },
    features: ["Advanced ceramic formula", "Low dust production", "Quiet operation", "Extended pad life"],
    compatibility: ["Toyota Camry 2018-2023", "Honda Accord 2019-2023", "Nissan Altima 2020-2023"],
  },
]
