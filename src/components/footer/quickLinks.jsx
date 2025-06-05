import { ChevronRight } from "lucide-react"

const quickLinksData = [
  "About Us",
  "Vehicle Parts Catalog",
  "Computer Components",
  "Best Sellers",
  "Current Deals",
  "Shipping Information",
  "Return Policy",
]

export const QuickLinks = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-[#ffc107]">Quick Links</h3>
      <ul className="space-y-2">
        {quickLinksData.map((link, index) => (
          <li key={index}>
            <a
              href="#"
              className="text-gray-300 hover:text-[#ffc107] transition-colors duration-300 flex items-center group"
            >
              <ChevronRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
