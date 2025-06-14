// Sample delivery agents
export const deliveryAgents = [
    {
      id: "agent-001",
      name: "Alex Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 123-4567",
      email: "alex.smith@example.com",
      activeDeliveries: 5,
      completedToday: 12,
      rating: 4.8,
      available: true,
      location: { lat: 40.7128, lng: -74.006 },
    },
    {
      id: "agent-002",
      name: "Emily Davis",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 987-6543",
      email: "emily.davis@example.com",
      activeDeliveries: 3,
      completedToday: 8,
      rating: 4.9,
      available: true,
      location: { lat: 34.0522, lng: -118.2437 },
    },
    {
      id: "agent-003",
      name: "Michael Lee",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 456-7890",
      email: "michael.lee@example.com",
      activeDeliveries: 4,
      completedToday: 10,
      rating: 4.7,
      available: true,
      location: { lat: 25.7617, lng: -80.1918 },
    },
    {
      id: "agent-004",
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 234-5678",
      email: "sarah.johnson@example.com",
      activeDeliveries: 2,
      completedToday: 7,
      rating: 4.6,
      available: false,
      location: { lat: 41.8781, lng: -87.6298 },
    },
    {
      id: "agent-005",
      name: "David Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      phone: "+1 (555) 876-5432",
      email: "david.wilson@example.com",
      activeDeliveries: 0,
      completedToday: 5,
      rating: 4.5,
      available: true,
      location: { lat: 37.7749, lng: -122.4194 },
    },
  ]
  
  // Generate sample deliveries
  export const generateSampleDeliveries = (count) => {
    const statuses = ["pending", "out_for_delivery", "delivered", "delayed", "cancelled"]
    const cities = ["New York, NY", "Los Angeles, CA", "Chicago, IL", "Houston, TX", "Miami, FL", "Seattle, WA"]
    const deliveries = []
  
    for (let i = 1; i <= count; i++) {
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      const agentId = Math.random() > 0.2 ? deliveryAgents[Math.floor(Math.random() * deliveryAgents.length)].id : null
      const city = cities[Math.floor(Math.random() * cities.length)]
      const orderValue = Math.floor(Math.random() * 500) + 50
      const deliveryFee = Math.floor(Math.random() * 20) + 5
  
      const hasIssues = Math.random() > 0.8
      const issues = hasIssues
        ? [
            {
              id: `issue-${i}-1`,
              type: Math.random() > 0.5 ? "Delayed Delivery" : "Package Damaged",
              description: "Customer reported issue with delivery",
              status: Math.random() > 0.5 ? "open" : "resolved",
              createdAt: new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString(),
            },
          ]
        : []
  
      const delivery = {
        id: `delivery-${i.toString().padStart(3, "0")}`,
        orderId: `ORD${i.toString().padStart(3, "0")}`,
        customerName: `Customer ${i}`,
        customerEmail: `customer${i}@example.com`,
        customerPhone: `+1 (555) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        address: `${Math.floor(Math.random() * 9000) + 1000} Main St, Apt ${Math.floor(Math.random() * 100) + 1}`,
        city: city.split(",")[0],
        state: city.split(",")[1]?.trim() || "",
        zipCode: `${Math.floor(Math.random() * 90000) + 10000}`,
        items: Math.floor(Math.random() * 5) + 1,
        orderValue,
        deliveryFee,
        deliveryAgentId: agentId,
        estimatedDelivery: new Date(Date.now() + Math.floor(Math.random() * 7 * 86400000)).toISOString(),
        actualDelivery:
          status === "delivered" ? new Date(Date.now() - Math.floor(Math.random() * 86400000)).toISOString() : null,
        status,
        trackingNumber: `TRK${Math.floor(Math.random() * 10000000)}`,
        notes: "",
        createdAt: new Date(Date.now() - Math.floor(Math.random() * 30 * 86400000)).toISOString(),
        updatedAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 86400000)).toISOString(),
        location:
          status === "out_for_delivery"
            ? {
                lat: 40.7128 + (Math.random() - 0.5) * 0.1,
                lng: -74.006 + (Math.random() - 0.5) * 0.1,
              }
            : undefined,
        issues,
      }
  
      deliveries.push(delivery)
    }
  
    return deliveries
  }
  
  // Sample delivery issues
  export const initialIssues = [
    {
      id: "issue-001",
      deliveryId: "delivery-001",
      orderId: "ORD001",
      customerName: "John Doe",
      type: "Delayed Delivery",
      description: "Package was supposed to arrive yesterday but hasn't been delivered yet.",
      status: "open",
      priority: "high",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date(Date.now() - 43200000).toISOString(),
    },
    {
      id: "issue-002",
      deliveryId: "delivery-005",
      orderId: "ORD005",
      customerName: "Emma Wilson",
      type: "Package Damaged",
      description: "Customer reports that the package arrived with visible damage to the box.",
      status: "in_progress",
      priority: "medium",
      createdAt: new Date(Date.now() - 172800000).toISOString(),
      updatedAt: new Date(Date.now() - 86400000).toISOString(),
    },
    {
      id: "issue-003",
      deliveryId: "delivery-010",
      orderId: "ORD010",
      customerName: "Michael Brown",
      type: "Wrong Item Delivered",
      description: "Customer received a different item than what was ordered.",
      status: "open",
      priority: "high",
      createdAt: new Date(Date.now() - 259200000).toISOString(),
      updatedAt: new Date(Date.now() - 172800000).toISOString(),
    },
    {
      id: "issue-004",
      deliveryId: "delivery-015",
      orderId: "ORD015",
      customerName: "Sophia Martinez",
      type: "Missing Items",
      description: "Package arrived but was missing 2 of the 5 items ordered.",
      status: "resolved",
      priority: "medium",
      createdAt: new Date(Date.now() - 345600000).toISOString(),
      updatedAt: new Date(Date.now() - 259200000).toISOString(),
    },
    {
      id: "issue-005",
      deliveryId: "delivery-020",
      orderId: "ORD020",
      customerName: "Daniel Taylor",
      type: "Delivery to Wrong Address",
      description: "Package was delivered to a neighbor's house.",
      status: "resolved",
      priority: "low",
      createdAt: new Date(Date.now() - 432000000).toISOString(),
      updatedAt: new Date(Date.now() - 345600000).toISOString(),
    },
  ]
  
  // Sample pricing rules
  export const initialPricingRules = [
    {
      id: "rule-001",
      name: "Standard Delivery",
      type: "flat",
      basePrice: 5.99,
      active: true,
    },
    {
      id: "rule-002",
      name: "Express Delivery",
      type: "flat",
      basePrice: 12.99,
      active: true,
    },
    {
      id: "rule-003",
      name: "Distance-based Pricing",
      type: "distance",
      basePrice: 3.99,
      additionalPrice: 0.5, // per mile
      active: false,
    },
    {
      id: "rule-004",
      name: "Free Shipping on Orders Over $100",
      type: "value",
      basePrice: 0,
      threshold: 100,
      active: true,
    },
    {
      id: "rule-005",
      name: "Discounted Shipping on Orders Over $50",
      type: "value",
      basePrice: 2.99,
      threshold: 50,
      active: true,
    },
  ]
  
  // Sample warehouses
  export const warehouses = [
    { id: "wh1", name: "Main Warehouse" },
    { id: "wh2", name: "East Coast Facility" },
    { id: "wh3", name: "West Coast Facility" },
    { id: "wh4", name: "Central Distribution" },
  ]
  