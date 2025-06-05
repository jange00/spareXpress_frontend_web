import { Link } from "react-router-dom"
import { motion } from "framer-motion"

const CategoryCard = ({ category }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-md p-6 overflow-hidden"
    >
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-[#212121] mb-2">{category.title}</h3>
        <p className="text-gray-600">{category.description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {category.subcategories.map((subcategory, subIndex) => {
          const Icon = subcategory.icon
          return (
            <motion.div
              key={subcategory.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: subIndex * 0.1 }}
            >
              <Link
                to={subcategory.href}
                state={{
                  category: category.categoryId,
                  subcategory: subcategory.subcategoryId,
                  categoryName: category.title,
                  subcategoryName: subcategory.name,
                }}
                className="group relative flex items-start p-4 rounded-xl border border-gray-200 hover:border-[#ffc107] bg-white transition-all duration-300 hover:shadow-lg"
              >
                <div className="mr-4">
                  <div className="p-3 rounded-lg bg-[#ffc107]/10 text-[#212121] group-hover:bg-[#ffc107] group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#212121] mb-1 group-hover:text-[#ffc107] transition-colors duration-300">
                    {subcategory.name}
                  </h4>
                  <p className="text-sm text-gray-600">{subcategory.description}</p>
                </div>
                <div className="absolute top-4 right-4 opacity-0 transform translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                  <span className="text-[#ffc107]">→</span>
                </div>
              </Link>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}

export default CategoryCard
