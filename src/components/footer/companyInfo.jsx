import { SocialLinks } from "./socialLinks"

export const CompanyInfo = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">
        Spare<span className="text-[#ffc107]">X</span>press
      </h2>
      <p className="text-gray-300 mb-4">
        Your one-stop shop for quality vehicle and computer parts. We provide genuine parts with warranty and expert
        support.
      </p>
      <SocialLinks />
    </div>
  )
}
