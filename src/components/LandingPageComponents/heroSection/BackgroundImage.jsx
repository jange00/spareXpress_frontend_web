import React from "react";

export default function BackgroundImage({slide}) {
    
  return (
    <div className="absolute inset-0">
      <img
        src={slide.image || "/placeholder.svg"}
        alt={slide.title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent" />
    </div>
  );
}
