import { useState, useRef, useCallback } from "react"
import { APP_SETTINGS } from "../../utils/adminUser/constants"

const ImageUpload = ({ value, onChange, error, label = "Profile Picture", required = false, disabled = false }) => {
  // Component state
  const [preview, setPreview] = useState(value || "")
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")

  // Refs
  const fileInputRef = useRef(null)

  const validateFile = useCallback((file) => {
    const errors = []

    // Check file size
    if (file.size > APP_SETTINGS.MAX_FILE_SIZE) {
      errors.push(`File size must be less than ${APP_SETTINGS.MAX_FILE_SIZE / (1024 * 1024)}MB`)
    }

    // Check file type
    if (!APP_SETTINGS.ALLOWED_IMAGE_TYPES.includes(file.type)) {
      errors.push("Please select a valid image file (JPEG, PNG, GIF, or WebP)")
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }, [])

  const handleFileSelect = useCallback(
    async (file) => {
      if (!file) return

      // Clear previous errors
      setUploadError("")

      // Validate file
      const validation = validateFile(file)
      if (!validation.isValid) {
        setUploadError(validation.errors.join(". "))
        return
      }

      setIsUploading(true)

      try {
        const reader = new FileReader()

        reader.onload = (e) => {
          const imageUrl = e.target.result
          setPreview(imageUrl)
          onChange(imageUrl)
          setIsUploading(false)
        }

        reader.onerror = () => {
          setUploadError("Error reading file. Please try again.")
          setIsUploading(false)
        }

        reader.readAsDataURL(file)
      } catch (error) {
        console.error("Error processing image:", error)
        setUploadError("Error processing image. Please try again.")
        setIsUploading(false)
      }
    },
    [onChange, validateFile],
  )

  const handleFileChange = useCallback(
    (e) => {
      const file = e.target.files?.[0]
      if (file) {
        handleFileSelect(file)
      }
    },
    [handleFileSelect],
  )


  const handleDrop = useCallback(
    (e) => {
      e.preventDefault()
      setIsDragging(false)

      const file = e.dataTransfer.files?.[0]
      if (file) {
        handleFileSelect(file)
      }
    },
    [handleFileSelect],
  )

  const handleDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])


  const handleClick = useCallback(() => {
    if (!isUploading && !disabled) {
      fileInputRef.current?.click()
    }
  }, [isUploading, disabled])

  const handleRemove = useCallback(() => {
    if (!isUploading && !disabled) {
      setPreview("")
      onChange("")
      setUploadError("")
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }, [isUploading, disabled, onChange])

  // Component classes
  const containerClasses = `
    w-32 h-32 rounded-full overflow-hidden border-4 cursor-pointer 
    transition-all duration-200 relative
    ${isDragging ? "border-[#FFB800] shadow-lg" : "border-gray-200 hover:border-[#FFB800]"}
    ${error || uploadError ? "border-red-300" : ""}
    ${isUploading || disabled ? "opacity-50 cursor-not-allowed" : ""}
  `.trim()

  const overlayClasses = `
    absolute bottom-0 right-0 w-10 h-10 bg-[#FFB800] rounded-full 
    border-4 border-white shadow-lg flex items-center justify-center 
    cursor-pointer hover:bg-[#FFB800]/90 transition-colors
    ${isUploading || disabled ? "opacity-50 cursor-not-allowed" : ""}
  `.trim()

  return (
    <div className="space-y-3">
      {/* Label */}
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="flex flex-col items-center space-y-4">
        {/* Profile Image Container */}
        <div className="relative group">
          <div
            className={containerClasses}
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            role="button"
            tabIndex={0}
            aria-label="Upload profile picture"
          >
            {/* Image Preview or Placeholder */}
            {preview ? (
              <img
                src={preview || "/placeholder.svg"}
                alt="Profile preview"
                className="w-full h-full object-cover transition-opacity group-hover:opacity-75"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-400">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
            )}

            {/* Loading Overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <svg className="animate-spin h-8 w-8 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Professional + Icon Overlay */}
          <div className={overlayClasses} onClick={handleClick}>
            {isUploading ? (
              <svg className="animate-spin h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept={APP_SETTINGS.ALLOWED_IMAGE_TYPES.join(",")}
            onChange={handleFileChange}
            className="hidden"
            disabled={isUploading || disabled}
            aria-hidden="true"
          />
        </div>

        {/* Upload Instructions */}
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">
            {isUploading ? "Uploading..." : "Click the + icon to upload photo"}
          </p>
          <p className="text-xs text-gray-500">
            JPEG, PNG, GIF, WebP up to {APP_SETTINGS.MAX_FILE_SIZE / (1024 * 1024)}MB
          </p>
        </div>

        {/* Drag and Drop Alternative Area */}
        <div
          className={`
            w-full max-w-sm border-2 border-dashed rounded-lg p-4 text-center 
            cursor-pointer transition-colors
            ${isDragging ? "border-[#FFB800] bg-[#FFB800]/10" : "border-gray-300 hover:border-[#FFB800] hover:bg-gray-50"}
            ${error || uploadError ? "border-red-300 bg-red-50" : ""}
            ${isUploading || disabled ? "opacity-50 cursor-not-allowed" : ""}
          `.trim()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleClick}
        >
          <div className="space-y-2">
            <svg className="mx-auto h-8 w-8 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <div className="text-xs text-gray-600">{isUploading ? "Processing..." : "Or drag and drop here"}</div>
          </div>
        </div>

        {/* Action Buttons */}
        {preview && !isUploading && !disabled && (
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={handleClick}
              className="px-3 py-1.5 bg-[#FFB800] text-black text-sm font-medium rounded-md hover:bg-[#FFB800]/90 transition-colors"
            >
              Change Photo
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="px-3 py-1.5 bg-red-100 text-red-800 text-sm font-medium rounded-md hover:bg-red-200 transition-colors"
            >
              Remove
            </button>
          </div>
        )}
      </div>

      {/* Error Messages */}
      {(error || uploadError) && <p className="text-sm text-red-600 text-center">{error || uploadError}</p>}
    </div>
  )
}

export default ImageUpload
