import { Link } from "react-router-dom"

export default function Breadcrumb({ items }) {
  return (
    <div className="bg-white border-b">
      <div className="container mx-auto px-4 py-3">
        <nav className="flex text-sm">
          {items.map((item, index, array) => (
            <div key={index} className="flex items-center">
              {index > 0 && <span className="mx-2 text-gray-400">/</span>}
              <Link
                to={index === 0 ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
                className={`${
                  index === array.length - 1 ? "text-[#ffc107] font-medium" : "text-gray-600 hover:text-[#ffc107]"
                }`}
              >
                {item}
              </Link>
            </div>
          ))}
        </nav>
      </div>
    </div>
  )
}
