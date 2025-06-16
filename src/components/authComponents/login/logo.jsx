import React from 'react'
import { Link } from 'react-router-dom' 

export const Logo = () => {
    return (
      <Link className="flex justify-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800 tracking-wider cursor-pointer">
          Spare<span className="text-yellow-500">Xpress</span>
        </h1>
      </Link>
    )
  }
  