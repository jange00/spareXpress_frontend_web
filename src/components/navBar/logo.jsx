const Logo = () => {
  const handleHomeClick = () => {
    window.location.href = "/"
    window.scrollTo(0, 0)
  }

  return (
    <h1
      className="text-3xl font-extrabold text-[#212121] tracking-wider cursor-pointer hover:text-[#424242] transition duration-300 ease-in-out transform hover:scale-105"
      onClick={handleHomeClick}
    >
      Spare<span className="text-red-600">X</span>press
    </h1>
  )
}

export default Logo
