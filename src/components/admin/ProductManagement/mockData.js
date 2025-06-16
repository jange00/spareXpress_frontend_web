// Mock data for development
export const mockCategories = [
    { _id: "cat1", name: "Vehicle Parts" },
    { _id: "cat2", name: "Computer parts" },
    // { _id: "cat3", name: "Home & Garden" },
    // { _id: "cat4", name: "Sports & Outdoors" },
    // { _id: "cat5", name: "Books" },
  ]
  
  export const mockSubcategories = [
    { _id: "sub1", name: "Engine Break", categoryId: "cat1" },
    { _id: "sub2", name: "Laptops", categoryId: "cat1" },
    // { _id: "sub3", name: "Headphones", categoryId: "cat1" },
    // { _id: "sub4", name: "Men's Clothing", categoryId: "cat2" },
    // { _id: "sub5", name: "Women's Clothing", categoryId: "cat2" },
    // { _id: "sub6", name: "Furniture", categoryId: "cat3" },
    // { _id: "sub7", name: "Garden Tools", categoryId: "cat3" },
    // { _id: "sub8", name: "Fitness Equipment", categoryId: "cat4" },
    // { _id: "sub9", name: "Fiction", categoryId: "cat5" },
  ]
  
  export const mockBrands = [
    { _id: "brand1", name: "Apple" },
    { _id: "brand2", name: "Samsung" },
    { _id: "brand3", name: "Nike" },
    { _id: "brand4", name: "Adidas" },
    { _id: "brand5", name: "Sony" },
    { _id: "brand6", name: "Dell" },
    { _id: "brand7", name: "HP" },
    { _id: "brand8", name: "IKEA" },
  ]
  
  export const mockSpecifications = [
    // { _id: "spec1", name: "Basic Electronics Spec" },
    // { _id: "spec2", name: "Premium Electronics Spec" },
    // { _id: "spec3", name: "Clothing Size Chart" },
    // { _id: "spec4", name: "Furniture Dimensions" },
  ]
  
  export const mockProducts = [
    {
      _id: "prod1",
      name: "iPhone 15 Pro",
      categoryId: "cat1",
      subCategoryId: "sub1",
      brandId: "brand1",
      price: 999.99,
      image: [
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      ],
      description: "Latest iPhone with advanced camera system and A17 Pro chip",
      stock: 25,
      shippingCharge: 9.99,
      discount: 5,
      specificationsId: "spec2",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: "2024-01-15T10:30:00Z",
    },
    {
      _id: "prod2",
      name: "Samsung Galaxy S24",
      categoryId: "cat1",
      subCategoryId: "sub1",
      brandId: "brand2",
      price: 849.99,
      image: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400"],
      description: "Flagship Android phone with AI-powered features",
      stock: 18,
      shippingCharge: 9.99,
      discount: 10,
      specificationsId: "spec2",
      createdAt: "2024-01-14T09:15:00Z",
      updatedAt: "2024-01-14T09:15:00Z",
    },
    {
      _id: "prod3",
      name: "MacBook Pro 16-inch",
      categoryId: "cat1",
      subCategoryId: "sub2",
      brandId: "brand1",
      price: 2499.99,
      image: ["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"],
      description: "Professional laptop with M3 Pro chip for demanding workflows",
      stock: 8,
      shippingCharge: 19.99,
      discount: 0,
      specificationsId: "spec2",
      createdAt: "2024-01-13T14:20:00Z",
      updatedAt: "2024-01-13T14:20:00Z",
    },
    {
      _id: "prod4",
      name: "Nike Air Max 270",
      categoryId: "cat2",
      subCategoryId: "sub2",
      brandId: "brand3",
      price: 129.99,
      image: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"],
      description: "Comfortable running shoes with Max Air cushioning",
      stock: 45,
      shippingCharge: 7.99,
      discount: 15,
      specificationsId: "spec3",
      createdAt: "2024-01-12T11:45:00Z",
      updatedAt: "2024-01-12T11:45:00Z",
    },
    {
      _id: "prod5",
      name: "Sony WH-1000XM5",
      categoryId: "cat1",
      subCategoryId: "sub2",
      brandId: "brand5",
      price: 349.99,
      image: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400"],
      description: "Premium noise-canceling wireless headphones",
      stock: 3,
      shippingCharge: 5.99,
      discount: 8,
      specificationsId: "spec1",
      createdAt: "2024-01-11T16:30:00Z",
      updatedAt: "2024-01-11T16:30:00Z",
    },
    {
      _id: "prod6",
      name: "IKEA MALM Bed Frame",
      categoryId: "cat1",
      subCategoryId: "sub1",
      brandId: "brand8",
      price: 179.99,
      image: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"],
      description: "Modern bed frame with clean lines and storage options",
      stock: 0,
      shippingCharge: 49.99,
      discount: 0,
      specificationsId: "spec4",
      createdAt: "2024-01-10T08:15:00Z",
      updatedAt: "2024-01-10T08:15:00Z",
    },
    {
      _id: "prod6",
      name: "IKEA MALM Bed Frame",
      categoryId: "cat1",
      subCategoryId: "sub2",
      brandId: "brand8",
      price: 179.99,
      image: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"],
      description: "Modern bed frame with clean lines and storage options",
      stock: 0,
      shippingCharge: 49.99,
      discount: 0,
      specificationsId: "spec4",
      createdAt: "2024-01-10T08:15:00Z",
      updatedAt: "2024-01-10T08:15:00Z",
    },
    {
      _id: "prod6",
      name: "IKEA MALM Bed Frame",
      categoryId: "cat1",
      subCategoryId: "sub1",
      brandId: "brand8",
      price: 179.99,
      image: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400"],
      description: "Modern bed frame with clean lines and storage options",
      stock: 0,
      shippingCharge: 49.99,
      discount: 0,
      specificationsId: "spec4",
      createdAt: "2024-01-10T08:15:00Z",
      updatedAt: "2024-01-10T08:15:00Z",
    },
  ]
  
  // Helper functions
  export const getCategoryName = (categoryId) => {
    const category = mockCategories.find((cat) => cat._id === categoryId)
    return category ? category.name : "Unknown"
  }
  
  export const getSubcategoryName = (subCategoryId) => {
    const subcategory = mockSubcategories.find((sub) => sub._id === subCategoryId)
    return subcategory ? subcategory.name : "Unknown"
  }
  
  export const getBrandName = (brandId) => {
    const brand = mockBrands.find((brand) => brand._id === brandId)
    return brand ? brand.name : "Unknown"
  }
  
  export const getSubcategoriesByCategory = (categoryId) => {
    return mockSubcategories.filter((sub) => sub.categoryId === categoryId)
  }
  