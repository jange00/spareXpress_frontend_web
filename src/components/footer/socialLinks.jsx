import { Facebook, Twitter, Instagram, Youtube } from "lucide-react"

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Youtube, href: "#", label: "YouTube" },
]

export const SocialLinks = () => {
  return (
    <div className="flex space-x-4">
      {socialLinks.map((social, index) => {
        const IconComponent = social.icon
        return (
          <a
            key={index}
            href={social.href}
            className="hover:text-[#ffc107] transition-colors duration-300"
            aria-label={social.label}
          >
            <IconComponent className="w-6 h-6" />
          </a>
        )
      })}
    </div>
  )
}
