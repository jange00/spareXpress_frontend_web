import { useState, useEffect } from "react";
import {
  SearchIcon,
  PlusIcon,
  UploadIcon,
  DownloadIcon,
  PackageIcon,
  RefreshCwIcon as RefreshIcon,
  WarehouseIcon,
  TrashIcon,
  EyeIcon,
  MoreHorizontalIcon,
  PlusCircleIcon,
  EditIcon,
} from "lucide-react";
import ProductDetailsModal from "../../components/admin/inventoryAndStockManagement/productDetailsModal";
import RestockModal from "../../components/admin/inventoryAndStockManagement/restockModal";
import AddProductModal from "../../components/admin/inventoryAndStockManagement/addProductModal";
import BulkActionModal from "../../components/admin/inventoryAndStockManagement/bulkActionModal";
import Badge from "../../components/admin/inventoryAndStockManagement/ui/badge";
import {
  initialInventory,
  categories,
  brands,
  warehouses,
} from "../../components/admin/inventoryAndStockManagement/sampleData";

import { useGetAllProduct } from "../../hook/admin/useProduct/useGetAllProduct";
import { useGetAllCategory } from "../../hook/admin/useCategory/useGetAllCategory";
import { useGetAllSubCategory } from "../../hook/admin/useSubCategory/useGetAllSubCategory";
import { useGetAllBrand } from "../../hook/admin/useBrands/useGetAllBrand";
import { useDeleteProduct } from "../../hook/admin/useProduct/useDeleteProduct";
import { useUpdateProduct } from "../../hook/admin/useProduct/useUpdateProduct";

const InventoryManagement = () => {
  // ================ DATA FETCHING FROM HOOKS ================
  const { data: allProducts = [], isLoading: isLoadingProducts } =
    useGetAllProduct();
  const { data: allCategories = [], isLoading: isLoadingCategories } =
    useGetAllCategory();
  const { data: allSubCategories = [], isLoading: isLoadingSubCategories } =
    useGetAllSubCategory();
  const { data: allBrands = [], isLoading: isLoadingBrands } = useGetAllBrand();
  // Correctly use the mutation hook for deleting products
  const { mutate: deleteProductMutation } = useDeleteProduct();

  // ================ STATE MANAGEMENT ================
  // Primary state for inventory data
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);

  // Search and filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subcategoryFilter, setSubcategoryFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [warehouseFilter, setWarehouseFilter] = useState("");

  // Selection states
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  // Modal states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isRestockModalOpen, setIsRestockModalOpen] = useState(false);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isBulkActionOpen, setIsBulkActionOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [bulkAction, setBulkAction] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);

  // Available subcategories based on selected category
  const [availableSubcategories, setAvailableSubcategories] = useState([]);

  // Available brands based on selected category
  const [availableBrands, setAvailableBrands] = useState([]);

  // ================ EFFECTS ================
  // This effect runs once after all data has been fetched to format and set the initial inventory.
  useEffect(() => {
    const allDataLoaded =
      !isLoadingProducts &&
      !isLoadingCategories &&
      !isLoadingBrands &&
      !isLoadingSubCategories;

    if (allDataLoaded) {
      const formattedProducts = allProducts.map((product) => {
        const category = allCategories.find(
          (c) => c._id === product.categoryId
        );
        const subcategory = allSubCategories.find(
          (sc) => sc._id === product.subcategoryId
        );
        const brand = allBrands.find((b) => b._id === product.brandId);
        
        // The stock property from the backend product object
        const stockLevel = product.stock || 0; 

        // UPDATED STATUS LOGIC
        const status =
          stockLevel === 0
            ? "out-of-stock"
            // OLD: stockLevel <= minStockLevel
            : stockLevel <= 10 // NEW: Check if less than or equal to 10
            ? "low-stock"
            : "in-stock";
            
        return {
          ...product,
          id: product._id, // Use backend _id as the primary identifier
          image: product.images?.[0] || "/placeholder.svg",
          category: category?.name || "Uncategorized",
          subcategory: subcategory?.name || "N/A",
          brand: brand?.name || "Unbranded",
          status,
          lastRestocked: product.updatedAt,
        };
      });
      setInventory(formattedProducts);
      setAvailableBrands(allBrands); // Set all brands initially
    }
  }, [
    allProducts,
    allCategories,
    allSubCategories,
    allBrands,
    isLoadingProducts,
    isLoadingCategories,
    isLoadingSubCategories,
    isLoadingBrands,
  ]);

  // This effect filters the inventory whenever the source data or any filter changes.
  useEffect(() => {
    let result = [...inventory];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    // Apply category filter
    if (categoryFilter) {
      result = result.filter((product) => product.category === categoryFilter);
    }
    // Apply subcategory filter
    if (subcategoryFilter) {
      result = result.filter(
        (product) => product.subcategory === subcategoryFilter
      );
    }
    // Apply brand filter
    if (brandFilter) {
      result = result.filter((product) => product.brand === brandFilter);
    }
    // Apply status filter
    if (statusFilter) {
      result = result.filter((product) => product.status === statusFilter);
    }
    // Apply warehouse filter
    // if (warehouseFilter) {
    //   result = result.filter(
    //     (product) => product.warehouse === warehouseFilter
    //   );
    // }

    // Sort by stock level (lowest first)
    result.sort((a, b) => a.stock - b.stock); // Using original 'stock' property

    setFilteredInventory(result);
  }, [
    inventory,
    searchTerm,
    categoryFilter,
    subcategoryFilter,
    brandFilter,
    statusFilter,
    // warehouseFilter,
  ]);

  // This effect updates available subcategories when the main category filter changes.
  useEffect(() => {
    if (categoryFilter) {
      const selectedCategory = allCategories.find(
        (cat) => cat.name === categoryFilter
      );
      if (selectedCategory) {
        // Filter subcategories based on the selected category's ID
        const relatedSubcategories = allSubCategories.filter(
          (sub) => sub.categoryId === selectedCategory._id
        );
        setAvailableSubcategories(relatedSubcategories);
        // Reset subcategory filter if it's no longer valid
        if (
          !relatedSubcategories.find((sub) => sub.name === subcategoryFilter)
        ) {
          setSubcategoryFilter("");
        }
      }
    } else {
      // If no category is selected, clear subcategories and show all brands
      setAvailableSubcategories([]);
      setSubcategoryFilter("");
      setAvailableBrands(allBrands);
    }
  }, [categoryFilter, allCategories, allSubCategories, allBrands]);
  

  // RENDER FUNCTION: Add a loading state check
  if (
    isLoadingProducts ||
    isLoadingCategories ||
    isLoadingBrands ||
    isLoadingSubCategories
  ) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading Inventory Data...</div>
      </div>
    );
  }

  // ================ EVENT HANDLERS ================

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredInventory.map((product) => product.id));
    }
    setSelectAll(!selectAll);
  };

  /**
   * Handles selecting individual product
   */
  const handleSelectProduct = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(
        selectedProducts.filter((productId) => productId !== id)
      );
    } else {
      setSelectedProducts([...selectedProducts, id]);
    }
  };

  /**
   * Opens product details modal for a specific product
   */
  const handleViewProduct = (product, editMode = false) => {
    setCurrentProduct(product);
    setIsProductModalOpen(true);
    setIsEditMode(editMode);
  };

  /**
   * Opens restock modal for a specific product
   */
  const handleRestockProduct = (product) => {
    setCurrentProduct(product);
    setIsRestockModalOpen(true);
  };

  /**
   * Updates the stock level of a product
   */
  const handleUpdateStock = (productId, newStockLevel) => {
    const updatedInventory = inventory.map((product) => {
      if (product.id === productId) {
        // UPDATED STATUS LOGIC
        const status =
          newStockLevel === 0
            ? "out-of-stock"
            // OLD: newStockLevel <= product.minStockLevel
            : newStockLevel <= 10 // NEW
            ? "low-stock"
            : "in-stock";

        return {
          ...product,
          stock: newStockLevel, // Using original 'stock' property
          status,
          lastRestocked: new Date().toISOString(),
        };
      }
      return product;
    });

    setInventory(updatedInventory);

    if (currentProduct && currentProduct.id === productId) {
        // UPDATED STATUS LOGIC
      const status =
        newStockLevel === 0
          ? "out-of-stock"
          // OLD: newStockLevel <= currentProduct.minStockLevel
          : newStockLevel <= 10 // NEW
          ? "low-stock"
          : "in-stock";

      setCurrentProduct({
        ...currentProduct,
        stock: newStockLevel, // Using original 'stock' property
        status,
        lastRestocked: new Date().toISOString(),
      });
    }
  };

  /**
   * Adds a new product to the inventory
   */
  const handleAddProduct = (newProduct) => {
    // In a real scenario, this would post to the backend and then refetch or optimistically update.
    // This is a simplified frontend-only version for now.
    const productNumber =
      Math.max(
        ...inventory.map((p) => Number.parseInt(p.id.replace("P", ""))),
        0
      ) + 1;
    const productId = `P${String(productNumber).padStart(3, "0")}`;
    
    // UPDATED STATUS LOGIC
    const status =
      newProduct.stock === 0 // Using original 'stock' property
        ? "out-of-stock"
        // OLD: newProduct.stockLevel <= newProduct.minStockLevel
        : newProduct.stock <= 10 // NEW
        ? "low-stock"
        : "in-stock";

    const product = {
      ...newProduct,
      id: productId,
      status,
      lastRestocked: new Date().toISOString(),
    };

    setInventory([...inventory, product]);
    setIsAddProductOpen(false);
  };

  /**
   * Updates an existing product
   */
  const handleUpdateProduct = (updatedProduct) => {
    // UPDATED STATUS LOGIC
    const status =
      updatedProduct.stock === 0 // Using original 'stock' property
        ? "out-of-stock"
        // OLD: updatedProduct.stockLevel <= updatedProduct.minStockLevel
        : updatedProduct.stock <= 10 // NEW
        ? "low-stock"
        : "in-stock";

    const product = {
      ...updatedProduct,
      status,
    };

    setInventory(inventory.map((p) => (p.id === product.id ? product : p)));
    setCurrentProduct(product);
    setIsEditMode(false);
  };

  /**
   * Deletes selected products in bulk.
   */
  const handleBulkDelete = () => {
    if (
      window.confirm(
        `Are you sure you want to delete ${selectedProducts.length} products? This action cannot be undone.`
      )
    ) {
      // Call the mutation for each selected product.
      // The useDeleteProduct hook is expected to handle invalidating queries
      // to trigger a refetch of the product list automatically.
      selectedProducts.forEach(productId => {
        deleteProductMutation(productId);
      });
      // Clear local selection state
      setSelectedProducts([]);
      setSelectAll(false);
    }
  };

  /**
   * Exports inventory in the specified format
   */
  const handleExportInventory = (format) => {
    // In a real application, this would generate and download the file
    alert(`Exporting inventory as ${format.toUpperCase()}`);
  };

  /**
   * Handles import inventory (mock function)
   */
  const handleImportInventory = () => {
    alert("Your inventory import has been initiated.");
  };

  // ================ UTILITY FUNCTIONS ================
  /**
   * Formats date for display
   */
  const formatDate = (dateString) => {
    if (!dateString) return "Never";

    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  /**
   * Returns appropriate badge component for product status
   */
  const getStatusBadge = (status) => {
    switch (status) {
      case "in-stock":
        return <Badge color="green">In Stock</Badge>;
      case "low-stock":
        return <Badge color="yellow">Low Stock</Badge>;
      case "out-of-stock":
        return <Badge color="red">Out of Stock</Badge>;
      default:
        return <Badge color="gray">{status}</Badge>;
    }
  };

  /**
   * Gets warehouse name from ID
   */
  const getWarehouseName = (warehouseId) => {
    const warehouse = warehouses.find((w) => w.id === warehouseId);
    return warehouse ? warehouse.name : "Unknown";
  };

  // ================ RENDER FUNCTION ================
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Top Section - Actions & Filters */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Inventory Management
            </h1>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="inline-flex items-center px-4 py-2 bg-[#FFB800] text-black font-medium rounded-lg hover:bg-[#FFB800]/90 transition-colors"
              >
                <PlusIcon className="w-5 h-5 mr-1" />
                Add New Stock
              </button>

              <button
                onClick={handleImportInventory}
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
              >
                <UploadIcon className="w-5 h-5 mr-1" />
                Import Stock Data
              </button>

              <div className="relative">
                <button
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                  onClick={(e) => {
                    e.currentTarget.nextElementSibling.classList.toggle(
                      "hidden"
                    );
                  }}
                >
                  <DownloadIcon className="w-5 h-5 mr-1" />
                  Export Stock Report
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10">
                  <div className="py-1">
                    <button
                      onClick={() => handleExportInventory("csv")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileTextIcon className="w-4 h-4 inline mr-2" />
                      Export as CSV
                    </button>
                    <button
                      onClick={() => handleExportInventory("excel")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileTextIcon className="w-4 h-4 inline mr-2" />
                      Export as Excel
                    </button>
                    <button
                      onClick={() => handleExportInventory("pdf")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FileTextIcon className="w-4 h-4 inline mr-2" />
                      Export as PDF
                    </button>
                  </div>
                </div>
              </div>

              {selectedProducts.length > 0 && (
                <div className="relative">
                  <button
                    className="inline-flex items-center px-4 py-2 bg-black text-white font-medium rounded-lg hover:bg-black/80 transition-colors"
                    onClick={(e) => {
                      e.currentTarget.nextElementSibling.classList.toggle(
                        "hidden"
                      );
                    }}
                  >
                    <PackageIcon className="w-5 h-5 mr-1" />
                    Bulk Actions ({selectedProducts.length})
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10">
                    <div className="py-1">
                      <button
                        onClick={(e) => {
                          setBulkAction("update-stock");
                          setIsBulkActionOpen(true);
                          e.currentTarget
                            .closest(".absolute")
                            .classList.add("hidden");
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <RefreshIcon className="w-4 h-4 inline mr-2" />
                        Update Stock
                      </button>
                      <button
                        onClick={(e) => {
                          setBulkAction("move-warehouse");
                          setIsBulkActionOpen(true);
                          e.currentTarget
                            .closest(".absolute")
                            .classList.add("hidden");
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <WarehouseIcon className="w-4 h-4 inline mr-2" />
                        Move to Warehouse
                      </button>
                      <button
                        onClick={(e) => {
                          handleBulkDelete();
                          e.currentTarget
                            .closest(".absolute")
                            .classList.add("hidden");
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <TrashIcon className="w-4 h-4 inline mr-2" />
                        Delete Products
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-6 gap-4">
            {/* Search */}
            <div className="md:col-span-2 relative">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by name or SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
              >
                <option value="">All Categories</option>
                {allCategories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Subcategory Filter */}
            <div>
              <select
                value={subcategoryFilter}
                onChange={(e) => setSubcategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
                disabled={
                  !categoryFilter || availableSubcategories.length === 0
                }
              >
                <option value="">All Subcategories</option>
                {availableSubcategories.map((subcategory) => (
                  <option key={subcategory._id} value={subcategory.name}>
                    {subcategory.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
              >
                <option value="">All Statuses</option>
                <option value="in-stock">In Stock</option>
                <option value="low-stock">Low Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>

            {/* Warehouse Filter */}
            <div>
              <select
                value={warehouseFilter}
                onChange={(e) => setWarehouseFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-[#FFB800] focus:border-[#FFB800] outline-none"
              >
                <option value="">All Warehouses</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse.id} value={warehouse.id}>
                    {warehouse.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="flex-1 container mx-auto px-4 py-6">
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectAll && filteredInventory.length > 0}
                        onChange={handleSelectAll}
                        disabled={filteredInventory.length === 0}
                        className="w-4 h-4 text-[#FFB800] border-gray-300 rounded focus:ring-[#FFB800]"
                      />
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product ID
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Brand
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Stock Level
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredInventory.length === 0 ? (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-6 py-4 text-center text-gray-500"
                    >
                      No products found
                    </td>
                  </tr>
                ) : (
                  filteredInventory.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={() => handleSelectProduct(product.id)}
                          className="w-4 h-4 text-[#FFB800] border-gray-300 rounded focus:ring-[#FFB800]"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          #{product.id.slice(-6)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={
                                product.image?.[0]
                                  ? `http://localhost:3000/${product.image[0]}`
                                  : "/placeholder.svg?height=48&width=48"
                              }
                              alt={product.name}
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src =
                                  "/placeholder.svg?height=48&width=48";
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              Npr.{product.price}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.categoryId.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {product.subcategory}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.brandId.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.stock}{" "}
                          {product.stock === 1 ? "Unit" : "Units"}
                        </div>
                        {/* <div className="text-xs text-gray-500">
                          Min: {product.minStockLevel}
                        </div> */}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(product.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-end space-x-2">
                          <div className="relative">
                            <button
                              onClick={(e) =>
                                e.currentTarget.nextElementSibling.classList.toggle(
                                  "hidden"
                                )
                              }
                              className="text-gray-500 hover:text-gray-700 p-1 rounded-full"
                            >
                              <MoreHorizontalIcon className="w-5 h-5" />
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg hidden z-10 border">
                              <div className="py-1">
                                <button
                                  onClick={(e) => {
                                    handleViewProduct(product);
                                    e.currentTarget
                                      .closest(".absolute")
                                      .classList.add("hidden");
                                  }}
                                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <EyeIcon className="w-4 h-4 inline mr-2" />
                                  View Details
                                </button>
                                <button
                                  onClick={(e) => {
                                    handleViewProduct(product, true);
                                    e.currentTarget
                                      .closest(".absolute")
                                      .classList.add("hidden");
                                  }}
                                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <EditIcon className="w-4 h-4 inline mr-2" />
                                  Edit Product
                                </button>
                                <button
                                  onClick={(e) => {
                                    handleRestockProduct(product);
                                    e.currentTarget
                                      .closest(".absolute")
                                      .classList.add("hidden");
                                  }}
                                  className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  <PlusCircleIcon className="w-4 h-4 inline mr-2" />
                                  Restock
                                </button>
                                <hr className="my-1 border-gray-200" />
                                <button 
                                  onClick={(e) => {
                                    if (window.confirm(`Are you sure you want to delete "${product.name}"? This action cannot be undone.`)) {
                                        deleteProductMutation(product.id);
                                    }
                                    e.currentTarget.closest(".absolute").classList.add("hidden");
                                  }}
                                  className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                  <TrashIcon className="w-4 h-4 inline mr-2" />
                                  Delete Product
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isProductModalOpen && currentProduct && (
        <ProductDetailsModal
          product={currentProduct}
          isEditMode={isEditMode}
          onClose={() => setIsProductModalOpen(false)}
          onUpdateProduct={handleUpdateProduct}
          onRestock={() => {
            setIsProductModalOpen(false);
            handleRestockProduct(currentProduct);
          }}
          onEdit={() => setIsEditMode(true)}
          formatDate={formatDate}
          getStatusBadge={getStatusBadge}
          getWarehouseName={getWarehouseName}
          categories={allCategories}
          brands={allBrands}
          warehouses={warehouses}
        />
      )}

      {isRestockModalOpen && currentProduct && (
        <RestockModal
          product={currentProduct}
          onClose={() => setIsRestockModalOpen(false)}
          onRestock={(productId, quantity) => {
            const newStockLevel = currentProduct.stock + quantity; // Using original 'stock' property
            handleUpdateStock(productId, newStockLevel);
            setIsRestockModalOpen(false);
          }}
          warehouses={warehouses}
        />
      )}

      {isAddProductOpen && (
        <AddProductModal
          onSave={handleAddProduct}
          onClose={() => setIsAddProductOpen(false)}
          categories={allCategories}
          brands={allBrands}
          warehouses={warehouses}
        />
      )}

      {isBulkActionOpen && (
        <BulkActionModal
          action={bulkAction}
          selectedCount={selectedProducts.length}
          onApply={(action, value) => {
            if (action === "update-stock") {
              const updatedInventory = inventory.map((product) => {
                if (selectedProducts.includes(product.id)) {
                  const newStockLevel = Number.parseInt(value);
                  // UPDATED STATUS LOGIC
                  const status =
                    newStockLevel === 0
                      ? "out-of-stock"
                      // OLD: newStockLevel <= product.minStockLevel
                      : newStockLevel <= 10 // NEW
                      ? "low-stock"
                      : "in-stock";
                  return {
                    ...product,
                    stock: newStockLevel, // Using original 'stock' property
                    status,
                    lastRestocked: new Date().toISOString(),
                  };
                }
                return product;
              });
              setInventory(updatedInventory);
            } else if (action === "move-warehouse") {
              const updatedInventory = inventory.map((product) => {
                if (selectedProducts.includes(product.id)) {
                  return { ...product, warehouse: value };
                }
                return product;
              });
              setInventory(updatedInventory);
            }
            setIsBulkActionOpen(false);
            setSelectedProducts([]);
            setSelectAll(false);
          }}
          onClose={() => setIsBulkActionOpen(false)}
          warehouses={warehouses}
        />
      )}
    </div>
  );
};

// Local Icon components used in the file
const FileTextIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" x2="8" y1="13" y2="13" />
    <line x1="16" x2="8" y1="17" y2="17" />
    <line x1="10" x2="8" y1="9" y2="9" />
  </svg>
);

export default InventoryManagement;