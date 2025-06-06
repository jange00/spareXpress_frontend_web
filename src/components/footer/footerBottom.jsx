const bottomLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"]

export const FooterBottom = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      {/* Copyright */}
      <div className="text-gray-400 text-sm">© {new Date().getFullYear()} SpareXpress. All rights reserved.</div>

      {/* Bottom Links */}
      <div className="flex space-x-6">
        {bottomLinks.map((link, index) => (
          <a key={index} href="#" className="text-gray-400 hover:text-[#ffc107] text-sm transition-colors duration-300">
            {link}
          </a>
        ))}
      </div>
    </div>
  )
}
