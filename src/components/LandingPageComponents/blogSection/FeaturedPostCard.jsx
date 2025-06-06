import { Link } from "react-router-dom";
import { Clock, MessageCircle, Share2, User } from "lucide-react";

const FeaturedPost = ({ post }) => (
  <Link
    to={`/blog/${post.id}`}
    className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-[#ffc107] transition-all duration-300 hover:shadow-xl"
  >
    <div className="relative aspect-[16/9] overflow-hidden">
      <img
        src={post.image || "/placeholder.svg"}
        alt={post.title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
      />
      <div className="absolute top-4 left-4">
        <span className="bg-[#ffc107] text-[#212121] px-3 py-1 rounded-full text-sm font-semibold">
          {post.category}
        </span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-2xl font-bold text-[#212121] mb-3 group-hover:text-[#ffc107] transition-colors duration-300">
        {post.title}
      </h3>
      <p className="text-gray-600 mb-4">{post.excerpt}</p>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
            <User className="w-5 h-5 text-gray-600" />
          </div>
          <div>
            <p className="font-semibold text-[#212121]">{post.author}</p>
            <p className="text-sm text-gray-600">{post.authorRole}</p>
          </div>
        </div>
        <button className="p-2 rounded-full hover:bg-gray-100 transition-colors duration-300">
          <Share2 className="w-5 h-5 text-gray-600" />
        </button>
      </div>
      <div className="flex items-center text-sm text-gray-600 space-x-4">
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {post.readTime}
        </div>
        <div className="flex items-center">
          <MessageCircle className="w-4 h-4 mr-1" />
          {post.comments} comments
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {post.tags.map((tag, index) => (
          <span key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
            #{tag}
          </span>
        ))}
      </div>
    </div>
  </Link>
);

export default FeaturedPost;
