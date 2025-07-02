import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";

import ProductImageGallery from "../components/productDetailsComponents/ProductImageGallery";
import ProductInfo from "../components/productDetailsComponents/ProductInfo";
import ProductFeatures from "../components/productDetailsComponents/ProductFeatures";
import ProductTabs from "../components/productDetailsComponents/ProductTabs";
import Breadcrumb from "../components/productDetailsComponents/Breadcrumb";
import LoadingSkeleton from "../components/productDetailsComponents/LoadingSkeleton";
import { useGetProductById } from "../hook/admin/useProduct/useGetProductById";

const ProductDetailsPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    isError,
  } = useGetProductById(productId);

  const [relatedProducts, setRelatedProducts] = useState([]);

  const handleBuyNow = (quantity) => {
    navigate("/checkout", {
      state: {
        productData: product,
        quantity,
      },
    });
  };

  const productImages = product ? Array(4).fill(product.image) : [];

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (isError || !product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
            <p className="text-gray-600 mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/products"
              className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold inline-flex items-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Products
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 mt-12">
      <div className="container mx-auto px-4">
        <Breadcrumb product={product} />

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <ProductImageGallery images={product.image} productName={product.name} />
            <div>
              <ProductInfo product={product} onBuyNow={handleBuyNow} />
              <ProductFeatures />
            </div>
          </div>
        </div>

        {/* Uncomment if ProductTabs are needed */}
        <ProductTabs product={product} />
      </div>
    </div>
  );
};

export default ProductDetailsPage;
