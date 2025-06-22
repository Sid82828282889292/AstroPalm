// components/HousePositions.tsx
import React from 'react'

export const HousePositions = ({ houses }: { houses: any[] }) => {
  if (!Array.isArray(houses)) {
    console.warn('HousePositions: houses is not an array', houses)
    return null
  }

  return (
    <div className="mt-10">
      <h3 className="text-xl font-semibold text-green-400">🏠 House Positions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {houses.map((house, index) => (
          <div key={index} className="bg-[#1f1f1f] p-4 rounded-xl shadow border border-green-800/20">
            <h4 className="text-lg font-medium text-green-200">House {house.House}</h4>
            <p className="text-sm text-gray-300">
              Degree: {house.degree.toFixed(2)}°<br />
              Normalized Degree: {house.normDegree.toFixed(2)}°<br />
              Sign: {house.zodiac_sign?.name?.en || '—'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
