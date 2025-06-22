// components/NatalWheelChart.tsx
import React from 'react'

export const NatalWheelChart = ({ url }: { url: string }) => {
  if (!url) return null

  return (
    <div className="mt-10 text-center">
      <h3 className="text-xl font-semibold text-cyan-400 mb-4">🌌 Natal Wheel Chart</h3>
      <img
        src={url}
        alt="Natal Wheel Chart"
        className="mx-auto w-full max-w-3xl border border-cyan-800 rounded-xl shadow"
      />
    </div>
  )
}
