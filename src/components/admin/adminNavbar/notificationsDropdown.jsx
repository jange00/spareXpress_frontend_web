import { Bell } from "lucide-react"

export const NotificationsDropdown = () => {
  return (
    <div className="relative">
      <button className="relative hover:bg-white/10 p-2 rounded-md">
        <Bell className="h-5 w-5 text-black" />
        <span className="absolute -right-1 -top-1 h-4 w-4 p-0 flex items-center justify-center bg-black text-white text-xs rounded-full">
          3
        </span>
      </button>
    </div>
  )
}
