import { Mail, Phone, MapPin } from "lucide-react"

const contactData = [
  {
    icon: MapPin,
    content: (
      <>
        Lokanthali,
        <br />
        Bhaktapur -
        <br />
        Nepal
      </>
    ),
    className: "items-start",
  },
  {
    icon: Phone,
    content: "+977 9860579795",
    className: "items-center",
  },
  {
    icon: Mail,
    content: "support@sparexpress.com",
    className: "items-center",
  },
]

export const ContactInfo = () => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-[#ffc107]">Contact Us</h3>
      <div className="space-y-4">
        {contactData.map((contact, index) => {
          const IconComponent = contact.icon
          return (
            <div key={index} className={`flex ${contact.className} space-x-3`}>
              <IconComponent className="w-5 h-5 text-[#ffc107] mt-1" />
              <span className="text-gray-300">{contact.content}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
