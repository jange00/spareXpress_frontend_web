import React from "react"
import { motion } from "framer-motion"
import CategoryCard from "./CategoryCard"
import { categories } from "./categoriesData"

const FeaturedCategories = () => {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-[#212121] mb-4 mt-12">Featured Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our extensive collection of high-quality vehicle and computer parts, carefully selected for
            performance and reliability
          </p>
        </motion.div>

        <div className="space-y-12">
          {categories.map((category, index) => (
            <CategoryCard key={category.title} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCategories
