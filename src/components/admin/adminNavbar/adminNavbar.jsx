import { Search } from "lucide-react"
import { NotificationsDropdown } from "./notificationsDropdown"
import { UserDropdown } from "./userDropdown"

const AdminNavbar = () => {
  return (
    <>
      {/* Desktop Navbar */}
      <header className="hidden h-16 items-center gap-4 border-b bg-[#FFB800] px-6 lg:flex">
        <div className="w-full flex-1 md:w-auto md:flex-none">
          <form>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="search"
                placeholder="Search for orders, products, users..."
                className="w-full rounded-lg bg-white border-transparent pl-8 focus:border-black/20 focus:ring-black/20 md:w-[300px] lg:w-[400px] placeholder:text-gray-500 p-2"
              />
            </div>
          </form>
        </div>
        <div className="ml-auto flex items-center gap-4">
          <NotificationsDropdown />
          <UserDropdown />
        </div>
      </header>
    </>
  )
}

export default AdminNavbar
