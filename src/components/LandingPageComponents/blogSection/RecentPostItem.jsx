import { Link } from "react-router-dom";

const RecentPost = ({ post }) => (
  <Link key={post.id} to={`/blog/${post.id}`} className="flex items-center space-x-4 group">
    <div className="flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden">
      <img
        src={post.image || "/placeholder.svg"}
        alt={post.title}
        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
      />
    </div>
    <div>
      <span className="text-sm text-[#ffc107] font-medium">{post.category}</span>
      <h4 className="text-lg font-semibold text-[#212121] group-hover:text-[#ffc107] transition-colors duration-300">
        {post.title}
      </h4>
      <p className="text-sm text-gray-600">{post.date}</p>
    </div>
  </Link>
);

export default RecentPost;
