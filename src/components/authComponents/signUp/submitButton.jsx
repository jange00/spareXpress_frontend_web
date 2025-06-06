const SubmitButton = ({ isLoading }) => {
    return (
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-4 rounded-lg font-medium text-lg transition-all duration-300 transform hover:scale-105 
          ${isLoading ? "bg-gray-300 cursor-not-allowed" : "bg-[#ffc107] hover:bg-[#ffcd38] text-[#212121]"}`}
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#212121] mr-2" />
            Creating Account...
          </div>
        ) : (
          "Create Account"
        )}
      </button>
    )
  }
  
  export default SubmitButton
  