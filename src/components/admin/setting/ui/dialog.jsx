import { createPortal } from "react-dom"

export const Dialog = ({ open, onOpenChange, children }) => {
  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">{children}</div>
    </div>,
    document.body,
  )
}

export const DialogHeader = ({ children, className = "" }) => {
  return <div className={`p-6 border-b border-gray-200 ${className}`}>{children}</div>
}

export const DialogTitle = ({ children, className = "" }) => {
  return <h2 className={`text-xl font-bold text-gray-900 ${className}`}>{children}</h2>
}

export const DialogDescription = ({ children, className = "" }) => {
  return <p className={`text-sm text-gray-500 mt-1 ${className}`}>{children}</p>
}

export const DialogContent = ({ children, className = "" }) => {
  return <div className={`p-6 overflow-y-auto max-h-[calc(90vh-12rem)] ${className}`}>{children}</div>
}

export const DialogFooter = ({ children, className = "" }) => {
  return <div className={`p-6 pt-0 border-t border-gray-200 flex justify-end gap-3 ${className}`}>{children}</div>
}
