import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { products } from "./data";
import ProductCard from "./ProductCard";
import { useGetAllProduct } from "../../../hook/admin/useProduct/useGetAllProduct";

const BestSellingProducts = () => {
  const { data: allProduct = [] } = useGetAllProduct();
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();

  const handleProductClick = (product) => {
    navigate(`/product/${product.id}`, {
      state: { productData: product },
    });
  };

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    console.log(`Added product ${product.id} to cart`);
  };

  const handleWishlist = (e, productId) => {
    e.stopPropagation();
    console.log(`Added product ${productId} to wishlist`);
  };

  const handleShare = (e, productId) => {
    e.stopPropagation();
    console.log(`Sharing product ${productId}`);
  };

  return (
    <section className="w-full py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container px-4 md:px-6 mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <div className="text-center md:text-left">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-yellow-500 h-1 w-20"></span>
              {/* <h2 className="text-4xl font-extrabold text-gray-900">Best-Selling Products</h2> */}
              <h2 className="text-4xl font-extrabold text-gray-900">
                All Products
              </h2>
            </div>
            <p className="text-gray-700 mt-2">
              Discover our top-rated auto and computer parts
            </p>
          </div>
          <Link
            to="/products"
            className="mt-4 md:mt-0 group flex items-center text-gray-900 hover:text-yellow-500 transition-colors duration-300"
          >
            <span className="mr-2 font-semibold relative">
              View All Products
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-yellow-500 group-hover:w-full transition-all duration-300"></span>
            </span>
            <TrendingUp className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...allProduct]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // 👈 Sort latest first
            .map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                hoveredProduct={hoveredProduct}
                setHoveredProduct={setHoveredProduct}
                onClick={handleProductClick}
                onAddToCart={handleAddToCart}
                onWishlist={handleWishlist}
                onShare={handleShare}
              />
            ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellingProducts;
