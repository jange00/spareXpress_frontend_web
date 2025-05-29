

import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, ChevronRight } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-[#212121] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Spare<span className="text-[#ffc107]">X</span>press
            </h2>
            <p className="text-gray-300 mb-4">
              Your one-stop shop for quality vehicle and computer parts. We provide genuine parts with warranty and
              expert support.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-[#ffc107] transition-colors duration-300">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-[#ffc107] transition-colors duration-300">
                <Twitter className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-[#ffc107] transition-colors duration-300">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-[#ffc107] transition-colors duration-300">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#ffc107]">Quick Links</h3>
            <ul className="space-y-2">
              {[
                "About Us",
                "Vehicle Parts Catalog",
                "Computer Components",
                "Best Sellers",
                "Current Deals",
                "Shipping Information",
                "Return Policy",
              ].map((link, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-[#ffc107] transition-colors duration-300 flex items-center group"
                  >
                    <ChevronRight className="w-4 h-4 mr-2 transform group-hover:translate-x-1 transition-transform duration-300" />
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#ffc107]">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-[#ffc107] mt-1" />
                <span className="text-gray-300">
                  Lokanthali,
                  <br />
                  Bhaktapur -
                  <br />
                   Nepal
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#ffc107]" />
                <span className="text-gray-300">+977 9860579795</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#ffc107]" />
                <span className="text-gray-300">support@sparexpress.com</span>
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#ffc107]">Newsletter</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for the latest updates, exclusive offers, and expert tips.
            </p>
            <form className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ffc107] border border-gray-700"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#ffc107] text-[#212121] font-semibold py-2 rounded-lg hover:bg-[#ffcd38] transition-colors duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">© {new Date().getFullYear()} SpareXpress. All rights reserved.</div>

            {/* Bottom Links */}
            <div className="flex space-x-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map((link, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-[#ffc107] text-sm transition-colors duration-300"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

