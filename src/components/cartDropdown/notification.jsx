export const Notification = ({ show, message }) => {
    return (
      <div
        className={`fixed top-20 right-4 bg-[#212121] text-white px-4 py-2 rounded-md shadow-lg z-[60] transition-opacity duration-300 ${
          show ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {message}
      </div>
    )
  }