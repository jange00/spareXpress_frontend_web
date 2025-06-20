export const mockUsers = [
    {
      _id: "001",
      fullname: "John Doe",
      email: "john@example.com",
      phoneNumber: "+1234567890",
      role: "Customer",
      profilePicture: "https://ui-avatars.com/api/?name=JD&background=FFB800&color=000000&size=128",
      status: "active",
      createdAt: "2025-03-08T10:30:00Z",
      updatedAt: "2025-03-09T08:15:00Z",
      lastLogin: "2025-03-09T08:15:00Z",
      orders: 12,
      totalSpent: 1250.75,
    },
    {
      _id: "002",
      fullname: "Alice Smith",
      email: "alice@example.com",
      phoneNumber: "+1987654321",
      role: "Customer",
      profilePicture: "https://ui-avatars.com/api/?name=AS&background=FFB800&color=000000&size=128",
      status: "active",
      createdAt: "2025-03-07T14:45:00Z",
      updatedAt: "2025-03-07T18:30:00Z",
      lastLogin: "2025-03-09T07:30:00Z",
      orders: 5,
      totalSpent: 750.25,
    },
    {
      _id: "003",
      fullname: "Bob Johnson",
      email: "bob@example.com",
      phoneNumber: "+1122334455",
      role: "Customer",
      profilePicture: "https://ui-avatars.com/api/?name=BJ&background=FFB800&color=000000&size=128",
      status: "banned",
      createdAt: "2025-03-06T09:15:00Z",
      updatedAt: "2025-03-06T09:15:00Z",
      lastLogin: "2025-03-06T10:20:00Z",
      orders: 0,
      totalSpent: 0,
    },
    {
      _id: "004",
      fullname: "Sarah Wilson",
      email: "sarah@example.com",
      phoneNumber: "+1555666777",
      role: "Customer",
      profilePicture: "https://ui-avatars.com/api/?name=SW&background=FFB800&color=000000&size=128",
      status: "pending",
      createdAt: "2025-03-05T16:20:00Z",
      updatedAt: "2025-03-05T16:20:00Z",
      lastLogin: null,
      orders: 0,
      totalSpent: 0,
    },
    {
      _id: "005",
      fullname: "Mike Davis",
      email: "mike@example.com",
      phoneNumber: "+1888999000",
      role: "Customer",
      profilePicture: "https://ui-avatars.com/api/?name=MD&background=FFB800&color=000000&size=128",
      status: "active",
      createdAt: "2025-03-04T11:05:00Z",
      updatedAt: "2025-03-08T14:30:00Z",
      lastLogin: "2025-03-08T14:30:00Z",
      orders: 8,
      totalSpent: 920.5,
    },
    {
      _id: "006",
      fullname: "Emma Thompson",
      email: "emma@example.com",
      phoneNumber: "+1777888999",
      role: "Customer",
      profilePicture: "https://ui-avatars.com/api/?name=ET&background=FFB800&color=000000&size=128",
      status: "active",
      createdAt: "2025-03-03T13:20:00Z",
      updatedAt: "2025-03-08T16:45:00Z",
      lastLogin: "2025-03-08T16:45:00Z",
      orders: 15,
      totalSpent: 2100.3,
    },
    {
      _id: "007",
      fullname: "David Chen",
      email: "david@example.com",
      phoneNumber: "+1666777888",
      role: "Customer",
      profilePicture: "https://ui-avatars.com/api/?name=DC&background=FFB800&color=000000&size=128",
      status: "active",
      createdAt: "2025-03-02T09:15:00Z",
      updatedAt: "2025-03-07T11:30:00Z",
      lastLogin: "2025-03-07T11:30:00Z",
      orders: 3,
      totalSpent: 450.75,
    },
    {
      _id: "008",
      fullname: "Lisa Rodriguez",
      email: "lisa@example.com",
      phoneNumber: "+1555444333",
      role: "Customer",
      profilePicture: "https://ui-avatars.com/api/?name=LR&background=FFB800&color=000000&size=128",
      status: "pending",
      createdAt: "2025-03-01T15:45:00Z",
      updatedAt: "2025-03-01T15:45:00Z",
      lastLogin: null,
      orders: 0,
      totalSpent: 0,
    },
    {
      _id: "009",
      fullname: "Michael Brown",
      email: "michael@example.com",
      phoneNumber: "+1444333222",
      role: "Customer",
      profilePicture: "https://ui-avatars.com/api/?name=MB&background=FFB800&color=000000&size=128",
      status: "banned",
      createdAt: "2025-02-28T12:00:00Z",
      updatedAt: "2025-03-05T14:20:00Z",
      lastLogin: "2025-03-04T10:15:00Z",
      orders: 2,
      totalSpent: 180.5,
    },
    {
      _id: "010",
      fullname: "Jennifer Lee",
      email: "jennifer@example.com",
      phoneNumber: "+1333222111",
      role: "Customer",
      profilePicture: "https://ui-avatars.com/api/?name=JL&background=FFB800&color=000000&size=128",
      status: "active",
      createdAt: "2025-02-27T08:30:00Z",
      updatedAt: "2025-03-06T17:20:00Z",
      lastLogin: "2025-03-06T17:20:00Z",
      orders: 7,
      totalSpent: 890.25,
    },
  ]
  
  // Mock Categories Data
  export const mockCategories = [
    {
      _id: "cat_001",
      title: "Electronics",
      description: "Electronic devices and gadgets",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "cat_002",
      title: "Clothing",
      description: "Fashion and apparel",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "cat_003",
      title: "Home & Garden",
      description: "Home improvement and garden supplies",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "cat_004",
      title: "Sports & Outdoors",
      description: "Sports equipment and outdoor gear",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "cat_005",
      title: "Books & Media",
      description: "Books, movies, and digital media",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
  ]
  
  // Mock Subcategories Data
  export const mockSubcategories = [
    // Electronics subcategories
    {
      _id: "sub_001",
      title: "Smartphones",
      categoryId: "cat_001",
      description: "Mobile phones and accessories",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "sub_002",
      title: "Laptops",
      categoryId: "cat_001",
      description: "Portable computers",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "sub_003",
      title: "Headphones",
      categoryId: "cat_001",
      description: "Audio devices",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    // Clothing subcategories
    {
      _id: "sub_004",
      title: "Men's Clothing",
      categoryId: "cat_002",
      description: "Clothing for men",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "sub_005",
      title: "Women's Clothing",
      categoryId: "cat_002",
      description: "Clothing for women",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "sub_006",
      title: "Shoes",
      categoryId: "cat_002",
      description: "Footwear for all",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    // Home & Garden subcategories
    {
      _id: "sub_007",
      title: "Furniture",
      categoryId: "cat_003",
      description: "Home furniture",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "sub_008",
      title: "Kitchen Appliances",
      categoryId: "cat_003",
      description: "Kitchen equipment",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    // Sports & Outdoors subcategories
    {
      _id: "sub_009",
      title: "Fitness Equipment",
      categoryId: "cat_004",
      description: "Exercise and fitness gear",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "sub_010",
      title: "Outdoor Gear",
      categoryId: "cat_004",
      description: "Camping and hiking equipment",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    // Books & Media subcategories
    {
      _id: "sub_011",
      title: "Fiction Books",
      categoryId: "cat_005",
      description: "Novels and fiction literature",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "sub_012",
      title: "Movies & TV",
      categoryId: "cat_005",
      description: "DVDs, Blu-rays, and digital media",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
  ]
  
  // Mock Brands Data
  export const mockBrands = [
    {
      _id: "brand_001",
      title: "Apple",
      description: "Technology company",
      logo: "https://logo.clearbit.com/apple.com",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "brand_002",
      title: "Samsung",
      description: "Electronics manufacturer",
      logo: "https://logo.clearbit.com/samsung.com",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "brand_003",
      title: "Nike",
      description: "Sports apparel and equipment",
      logo: "https://logo.clearbit.com/nike.com",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "brand_004",
      title: "Adidas",
      description: "Sports brand",
      logo: "https://logo.clearbit.com/adidas.com",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "brand_005",
      title: "Sony",
      description: "Electronics and entertainment",
      logo: "https://logo.clearbit.com/sony.com",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "brand_006",
      title: "Dell",
      description: "Computer technology",
      logo: "https://logo.clearbit.com/dell.com",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "brand_007",
      title: "HP",
      description: "Technology solutions",
      logo: "https://logo.clearbit.com/hp.com",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "brand_008",
      title: "IKEA",
      description: "Furniture and home goods",
      logo: "https://logo.clearbit.com/ikea.com",
      status: "active",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
  ]
  
  // Mock Specifications Data
  export const mockSpecifications = [
    {
      _id: "spec_001",
      name: "Screen Size",
      type: "text",
      options: ["5.5 inch", "6.1 inch", "6.7 inch"],
      required: true,
      categoryId: "cat_001",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "spec_002",
      name: "RAM",
      type: "select",
      options: ["4GB", "8GB", "16GB", "32GB"],
      required: true,
      categoryId: "cat_001",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "spec_003",
      name: "Storage",
      type: "select",
      options: ["64GB", "128GB", "256GB", "512GB", "1TB"],
      required: true,
      categoryId: "cat_001",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "spec_004",
      name: "Size",
      type: "select",
      options: ["XS", "S", "M", "L", "XL", "XXL"],
      required: true,
      categoryId: "cat_002",
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "spec_005",
      name: "Color",
      type: "select",
      options: ["Black", "White", "Red", "Blue", "Green", "Yellow"],
      required: false,
      categoryId: null, // Available for all categories
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
    {
      _id: "spec_006",
      name: "Material",
      type: "text",
      options: ["Cotton", "Polyester", "Leather", "Wood", "Metal", "Plastic"],
      required: false,
      categoryId: null,
      createdAt: "2025-01-01T00:00:00Z",
      updatedAt: "2025-01-01T00:00:00Z",
    },
  ]
  
  // Mock Products Data
  export const mockProducts = [
    {
      _id: "prod_001",
      name: "iPhone 15 Pro",
      categoryId: "cat_001",
      subCategoryId: "sub_001",
      brandId: "brand_001",
      price: 999.99,
      image: [
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
      ],
      description: "Latest iPhone with advanced features and premium design",
      stock: 50,
      shippingCharge: 0,
      discount: 10,
      specifications: {
        "Screen Size": "6.1 inch",
        RAM: "8GB",
        Storage: "256GB",
        Color: "Black",
      },
      status: "active",
      createdAt: "2025-01-15T10:00:00Z",
      updatedAt: "2025-01-15T10:00:00Z",
    },
    {
      _id: "prod_002",
      name: "Samsung Galaxy S24",
      categoryId: "cat_001",
      subCategoryId: "sub_001",
      brandId: "brand_002",
      price: 899.99,
      image: ["https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400"],
      description: "Powerful Android smartphone with excellent camera",
      stock: 30,
      shippingCharge: 15,
      discount: 5,
      specifications: {
        "Screen Size": "6.7 inch",
        RAM: "12GB",
        Storage: "512GB",
        Color: "Blue",
      },
      status: "active",
      createdAt: "2025-01-14T09:00:00Z",
      updatedAt: "2025-01-14T09:00:00Z",
    },
    {
      _id: "prod_003",
      name: "Nike Air Max 270",
      categoryId: "cat_002",
      subCategoryId: "sub_006",
      brandId: "brand_003",
      price: 150.0,
      image: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400"],
      description: "Comfortable running shoes with air cushioning",
      stock: 100,
      shippingCharge: 10,
      discount: 20,
      specifications: {
        Size: "US 10",
        Color: "White",
        Material: "Synthetic",
      },
      status: "active",
      createdAt: "2025-01-13T08:00:00Z",
      updatedAt: "2025-01-13T08:00:00Z",
    },
  ]
  
  /**
   * API-like functions for easy integration
   */
  
  // Get all users (simulates API call)
  export const getAllUsers = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockUsers, success: true })
      }, 500)
    })
  }
  
  // Get all categories (simulates API call)
  export const getAllCategories = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockCategories, success: true })
      }, 300)
    })
  }
  
  // Get all subcategories (simulates API call)
  export const getAllSubcategories = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockSubcategories, success: true })
      }, 300)
    })
  }
  
  // Get subcategories by category ID
  export const getSubcategoriesByCategory = (categoryId) => {
    return mockSubcategories.filter((sub) => sub.categoryId === categoryId)
  }
  
  // Get all brands (simulates API call)
  export const getAllBrands = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockBrands, success: true })
      }, 300)
    })
  }
  
  // Get all specifications (simulates API call)
  export const getAllSpecifications = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockSpecifications, success: true })
      }, 300)
    })
  }
  
  // Get all products (simulates API call)
  export const getAllProducts = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ data: mockProducts, success: true })
      }, 400)
    })
  }
  
  // Create user (simulates API call)
  export const createUser = (userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          _id: `user_${Date.now()}`,
          ...userData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        resolve({ data: newUser, success: true })
      }, 800)
    })
  }
  
  // Update user (simulates API call)
  export const updateUser = (userId, userData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const updatedUser = {
          ...userData,
          _id: userId,
          updatedAt: new Date().toISOString(),
        }
        resolve({ data: updatedUser, success: true })
      }, 800)
    })
  }
  
  // Delete user (simulates API call)
  export const deleteUser = (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: "User deleted successfully" })
      }, 600)
    })
  }
  
  // Bulk update users (simulates API call)
  export const bulkUpdateUsers = (userIds, updateData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: `${userIds.length} users updated successfully`,
          updatedCount: userIds.length,
        })
      }, 1000)
    })
  }
  