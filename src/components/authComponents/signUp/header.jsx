import Logo from "./logo"

const Header = () => {
  return (
    <div className="text-center mb-8 mt-24">
      <Logo />
      <h2 className="text-3xl font-bold text-[#212121] mb-2">Create Your Account</h2>
      <p className="text-gray-600">Join SpareXpress and get access to exclusive deals on auto and computer parts</p>
    </div>
  )
}

export default Header
