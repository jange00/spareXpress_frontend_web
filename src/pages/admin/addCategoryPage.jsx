import { useState, useEffect } from "react"
import CategoryForm from "../../components/admin/addCategory/CategoryForm"
import SearchAndFilters from "../../components/admin/UIs/addCategoryUi/SearchAndFilters"
import CategoryTable from "../../components/admin/addCategory/CategoryTable"
import ActionButtons from "../../components/admin/UIs/addCategoryUi/ActionButtons"
import Modal from "../../components/admin/UIs/addCategoryUi/Modal"
import { filterCategories, exportToCSV, exportToExcel, exportToPDF } from "../../components/admin/utils/addCategory/category-utils"

// API mutation hook
import { usePostCategory } from "../../hook/admin/useCategory/usePostCategory"
import { useGetAllCategory } from "../../hook/admin/useCategory/useGetAllCategory"
import { useDeleteCategory } from "../../hook/admin/useCategory/useDeleteCategory"

export default function AddCategoriesPage() {
  const { data: category = [] } = useGetAllCategory()
  const { mutateAsync: deleteCategory } = useDeleteCategory();
  // const { mutateAsync: updateCategory } = useUpdateCategory();

  const [categories, setCategories] = useState(category)
  const [filteredCategories, setFilteredCategories] = useState(category)
  const [selectedCategories, setSelectedCategories] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("createdAt")
  const [sortOrder, setSortOrder] = useState("desc")
  const [statusFilter, setStatusFilter] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editingCategory, setEditingCategory] = useState(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)

  // Mutation hooks
  const { mutateAsync: addCategory, isLoading: isAdding } = usePostCategory()
  

  // Apply filters whenever categories or filters change
  useEffect(() => {
    const filters = {
      search: searchTerm,
      sortBy,
      sortOrder,
      status: statusFilter,
    }
    const filtered = filterCategories(categories, filters)
    setFilteredCategories(filtered)
  }, [categories, searchTerm, sortBy, sortOrder, statusFilter])

  const handleAddCategory = async (formData) => {
    try {
      const newCat = await addCategory(formData)
      setCategories((prev) => [newCat, ...prev])
      setShowAddModal(false)
      alert("Category added successfully!")
    } catch (error) {
      alert("Failed to add category. Please try again.")
    }
  }

  const handleEditCategory = (category) => {
    setEditingCategory(category)
    setShowEditModal(true)
  }

  const handleUpdateCategory = async (formData) => {
    if (!editingCategory) return;
    setIsSubmitting(true);
    try {
      // Pass keys exactly as hook expects
      const updatedCat = await updateCategory({ id: editingCategory._id, updateCategory: formData });
  
      setCategories((prev) =>
        prev.map((cat) => (cat._id === editingCategory._id ? updatedCat : cat))
      );
  
      setShowEditModal(false);
      setEditingCategory(null);
      alert("Category updated successfully!");
    } catch (error) {
      console.error("Update failed", error);
      alert("Failed to update category. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const handleDeleteCategory = async (categoryId) => {
    const category = categories.find((c) => c._id === categoryId);
    if (!category) return;
  
    const confirmDelete = window.confirm(`Are you sure you want to delete "${category.title}"?`);
    if (!confirmDelete) return;
  
    try {
      await deleteCategory(categoryId); // call mutation as promise
  
      setCategories((prev) => prev.filter((c) => c._id !== categoryId));
      setSelectedCategories((prev) => prev.filter((id) => id !== categoryId));
      alert(`Category "${category.title}" deleted successfully.`);
    } catch (error) {
      console.error("Failed to delete category:", error);
      alert("Failed to delete category. Please try again.");
    }
  };

  const handleBulkDelete = (categoryIds) => {
    setCategories((prev) => prev.filter((c) => !categoryIds.includes(c._id)))
    setSelectedCategories([])
    alert(`${categoryIds.length} categories have been deleted.`)
  }

  const handleExport = (format) => {
    const dataToExport = filteredCategories.length > 0 ? filteredCategories : categories

    switch (format) {
      case "csv":
        exportToCSV(dataToExport)
        alert("Categories exported as CSV successfully!")
        break
      case "excel":
        exportToExcel(dataToExport)
        alert("Categories exported as Excel successfully!")
        break
      case "pdf":
        exportToPDF(dataToExport)
        alert("Categories exported as PDF successfully!")
        break
      default:
        break
    }
  }

  const handleRefresh = async () => {
    try {
      // Simulate API refresh
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Reset selections and show success
      setSelectedCategories([])
      alert("Categories refreshed successfully!")
    } catch (error) {
      alert("Failed to refresh categories.")
    }
  }

  const handleCreateCategory = () => {
    setShowAddModal(true)
  }

  const handleCloseAddModal = () => {
    setShowAddModal(false)
  }

  const handleCloseEditModal = () => {
    setShowEditModal(false)
    setEditingCategory(null)
  }

  const handleClearFilters = () => {
    setSearchTerm("")
    setSortBy("createdAt")
    setSortOrder("desc")
    setStatusFilter("")
    setSelectedCategories([])
    alert("All filters cleared!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-full">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-6">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
    {/* Header */}
    <div>
      <h3 className="text-2xl font-semibold text-gray-800">Category Management</h3>
      <p className="text-sm text-gray-600">
        Manage your ecommerce product categories efficiently
      </p>
    </div>

    {/* Action Buttons */}
    <ActionButtons
      selectedCategories={selectedCategories}
      categories={categories}
      onExport={handleExport}
      onRefresh={handleRefresh}
      onCreateCategory={handleCreateCategory}
      onBulkDelete={handleBulkDelete}
      onClearFilters={handleClearFilters}
    />
  </div>
</div>

</div>
        {/* Search and Filters */}
        <SearchAndFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />

        {/* Categories Table */}
        <CategoryTable
          categories={filteredCategories}
          onEdit={handleEditCategory}
          onDelete={handleDeleteCategory}
          selectedCategories={selectedCategories}
          onSelectionChange={setSelectedCategories}
        />

        {/* Add Category Modal */}
        <Modal isOpen={showAddModal} onClose={handleCloseAddModal} title="Add New Category" size="md">
          <CategoryForm
            onSubmit={handleAddCategory}
            isSubmitting={isSubmitting}
            onCancel={handleCloseAddModal}
            isEdit={false}
          />
        </Modal>

        {/* Edit Category Modal */}
        <Modal isOpen={showEditModal} onClose={handleCloseEditModal} title="Edit Category" size="md">
          <CategoryForm
            onSubmit={handleUpdateCategory}
            isSubmitting={isSubmitting}
            initialValues={editingCategory}
            onCancel={handleCloseEditModal}
            isEdit={true}
          />
        </Modal>
      </div>
    </div>
  )
}
