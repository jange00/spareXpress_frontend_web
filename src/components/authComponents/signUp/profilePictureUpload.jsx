import { Upload, User } from "lucide-react"

const ProfilePictureUpload = ({ profilePreview, handleProfilePictureChange }) => {
  return (
    <div className="flex justify-center">
      <div className="relative group">
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#ffc107] group-hover:border-[#ffcd38] transition-colors duration-300">
          {profilePreview ? (
            <img
              src={profilePreview || "/placeholder.svg"}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <User className="w-12 h-12 text-gray-400" />
            </div>
          )}
        </div>
        <label className="absolute bottom-0 right-0 bg-[#ffc107] hover:bg-[#ffcd38] rounded-full p-2 cursor-pointer transform transition-transform duration-300 group-hover:scale-110">
          <Upload className="w-4 h-4 text-[#212121]" />
          <input type="file" accept="image/*" className="hidden" onChange={handleProfilePictureChange} />
        </label>
      </div>
    </div>
  )
}

export default ProfilePictureUpload