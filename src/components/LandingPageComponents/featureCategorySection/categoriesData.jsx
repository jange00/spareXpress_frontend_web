import {
    Cpu,
    HardDrive,
    CpuIcon as Gpu,
    MemoryStickIcon as Ram,
    Fan,
    Power,
    Car,
    Gauge,
    Wrench,
    Battery,
    Cog,
    Fuel,
  } from "lucide-react"
  
  export const categories = [
    {
      title: "Vehicle Parts",
      description: "High-quality automotive parts for all makes and models",
      categoryId: "vehicle-parts",
      subcategories: [
        {
          name: "Engine Parts",
          icon: Car,
          description: "Complete engine solutions",
          href: "/vehicle/engine-parts",
          subcategoryId: "engine-parts",
        },
        {
          name: "Brake Systems",
          icon: Gauge,
          description: "Premium brake components",
          href: "/vehicle/brake-systems",
          subcategoryId: "brakes",
        },
        {
          name: "Transmission",
          icon: Cog,
          description: "Reliable transmission parts",
          href: "/vehicle/transmission",
          subcategoryId: "transmission",
        },
        {
          name: "Suspension",
          icon: Wrench,
          description: "Quality suspension systems",
          href: "/vehicle/suspension",
          subcategoryId: "suspension",
        },
        {
          name: "Electrical",
          icon: Battery,
          description: "Electrical components",
          href: "/vehicle/electrical",
          subcategoryId: "electrical",
        },
        {
          name: "Fuel System",
          icon: Fuel,
          description: "Fuel system parts",
          href: "/vehicle/fuel-system",
          subcategoryId: "fuel-system",
        },
      ],
    },
    {
      title: "Computer Parts",
      description: "Premium components for your custom PC build",
      categoryId: "computer-parts",
      subcategories: [
        {
          name: "Processors",
          icon: Cpu,
          description: "Latest generation CPUs",
          href: "/computer/processors",
          subcategoryId: "processors",
        },
        {
          name: "Storage",
          icon: HardDrive,
          description: "SSDs & Hard Drives",
          href: "/computer/storage",
          subcategoryId: "storage",
        },
        {
          name: "Graphics Cards",
          icon: Gpu,
          description: "High-performance GPUs",
          href: "/computer/graphics-cards",
          subcategoryId: "gpus",
        },
        {
          name: "Memory",
          icon: Ram,
          description: "RAM & Memory modules",
          href: "/computer/memory",
          subcategoryId: "memory",
        },
        {
          name: "Cooling",
          icon: Fan,
          description: "Cooling solutions",
          href: "/computer/cooling",
          subcategoryId: "cooling",
        },
        {
          name: "Power Supply",
          icon: Power,
          description: "Reliable PSUs",
          href: "/computer/power-supply",
          subcategoryId: "power-supply",
        },
      ],
    },
  ]
  