import { CompanyInfo } from "./companyInfo"
import { QuickLinks } from "./quickLinks"
import { ContactInfo } from "./contactInfo"
import { Newsletter } from "./newsletter"
import { FooterBottom } from "./footerBottom"

const Footer = () => {
  return (
    <footer className="bg-[#212121] text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <CompanyInfo />
          <QuickLinks />
          <ContactInfo />
          <Newsletter />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8 mt-8">
          <FooterBottom />
        </div>
      </div>
    </footer>
  )
}

export default Footer
