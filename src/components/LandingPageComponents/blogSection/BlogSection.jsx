import { Link } from "react-router-dom"
import { ChevronRight, BookOpen } from "lucide-react"
import FeaturedPostCard from "./FeaturedPostCard"
import RecentPostItem from "./RecentPostItem"
import CategoryCard from "./CategoryCard"
import { featuredPosts, recentPosts, categories } from "./data"

const BlogSection = () => {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-4xl font-bold text-[#212121] mb-4">Expert Tips & Guides</h2>
            <p className="text-lg text-gray-600 max-w-2xl">
              Discover helpful articles, maintenance tips, and upgrade guides for your vehicle and computer parts
            </p>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center mt-4 md:mt-0 text-[#212121] hover:text-[#ffc107] transition-colors duration-300 font-semibold group"
          >
            <BookOpen className="w-5 h-5 mr-2" />
            View All Articles
            <ChevronRight className="w-5 h-5 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Featured Posts */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <FeaturedPostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Recent Posts */}
          <div className="md:col-span-2 bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-[#212121] mb-6">Recent Articles</h3>
            <div className="space-y-6">
              {recentPosts.map((post) => (
                <RecentPostItem key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h3 className="text-xl font-bold text-[#212121] mb-6">Categories</h3>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <CategoryCard key={index} category={category} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogSection;