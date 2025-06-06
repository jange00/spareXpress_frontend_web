import { useState } from "react"

export const Newsletter = () => {
  const [email, setEmail] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-[#ffc107]">Newsletter</h3>
      <p className="text-gray-300 mb-4">
        Subscribe to our newsletter for the latest updates, exclusive offers, and expert tips.
      </p>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
  )
}
