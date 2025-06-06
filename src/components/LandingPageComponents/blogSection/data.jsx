import { IMAGE_PATHS } from "../../../common/imageConstant"
import { Car, Cpu, Wrench, Settings } from "lucide-react";

export const featuredPosts = [
  {
    id: 1,
    title: "How to Choose the Right Spare Parts for Your Vehicle",
    excerpt: "A comprehensive guide to selecting genuine and compatible auto parts for your car...",
    category: "Auto Parts",
    author: "John Smith",
    authorRole: "Automotive Expert",
    date: "Feb 20, 2024",
    readTime: "8 min read",
    comments: 24,
    image: IMAGE_PATHS.spare,
    tags: ["Vehicle Maintenance", "Buying Guide", "Tips"],
  },
  {
    id: 2,
    title: "Ultimate Guide to PC Performance Upgrades",
    excerpt: "Boost your computer's performance with these essential hardware upgrades...",
    category: "Computer Parts",
    author: "Sarah Johnson",
    authorRole: "Tech Specialist",
    date: "Feb 18, 2024",
    readTime: "10 min read",
    comments: 32,
    image: IMAGE_PATHS.computer,
    tags: ["PC Building", "Performance", "Hardware"],
  },
];

export const recentPosts = [
  {
    id: 3,
    title: "Common Signs Your Car Needs New Brake Pads",
    category: "Auto Parts",
    date: "Feb 15, 2024",
    image: IMAGE_PATHS.spare,
  },
  {
    id: 4,
    title: "SSD vs HDD: Which Storage is Right for You?",
    category: "Computer Parts",
    date: "Feb 14, 2024",
    image: IMAGE_PATHS.computer2,
  },
  {
    id: 5,
    title: "Essential Tools for DIY Car Maintenance",
    category: "Auto Parts",
    date: "Feb 12, 2024",
    image: IMAGE_PATHS.spare,
  },
];

export const categories = [
  { name: "Vehicle Maintenance", icon: Car, count: 45 },
  { name: "PC Building", icon: Cpu, count: 38 },
  { name: "Repair Guides", icon: Wrench, count: 32 },
  { name: "Tech Tips", icon: Settings, count: 28 },
];
