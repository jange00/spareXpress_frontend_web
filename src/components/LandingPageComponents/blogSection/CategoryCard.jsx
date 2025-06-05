import { Link } from "react-router-dom";

const CategoryItem = ({ category }) => {
  const IconComponent = category.icon;
  return (
    <Link
      to={`/blog/category/${category.name.toLowerCase()}`}
      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 group transition-colors duration-300"
    >
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-full bg-[#ffc107]/10 flex items-center justify-center group-hover:bg-[#ffc107] transition-colors duration-300">
          <IconComponent className="w-5 h-5 text-[#212121]" />
        </div>
        <span className="font-medium text-[#212121] group-hover:text-[#ffc107] transition-colors duration-300">
          {category.name}
        </span>
      </div>
      <span className="text-sm text-gray-600">{category.count} articles</span>
    </Link>
  );
};

export default CategoryItem;
