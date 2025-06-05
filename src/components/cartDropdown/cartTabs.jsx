export const CartTabs = ({ activeTab, setActiveTab, cartItemsCount, savedItemsCount }) => {
    return (
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-3 font-medium text-sm transition-colors ${
            activeTab === "cart" ? "text-[#212121] border-b-2 border-[#ffc107]" : "text-gray-500 hover:text-[#212121]"
          }`}
          onClick={() => setActiveTab("cart")}
        >
          Shopping Cart ({cartItemsCount})
        </button>
        <button
          className={`flex-1 py-3 font-medium text-sm transition-colors ${
            activeTab === "saved" ? "text-[#212121] border-b-2 border-[#ffc107]" : "text-gray-500 hover:text-[#212121]"
          }`}
          onClick={() => setActiveTab("saved")}
        >
          Saved Items ({savedItemsCount})
        </button>
      </div>
    )
  }
  