"use client"

import { useState } from "react"

interface FlipCardProps {
  frontText: string
  backText: string
}

export default function FlipCard({ frontText, backText }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="w-[300px] h-[440px] [perspective:1000px] cursor-pointer"
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700`}
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)"
        }}
      >
        {/* Front Side */}
        <div
          className="absolute w-full h-full rounded-xl overflow-hidden shadow-lg border-2 border-yellow-400"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <video
            src="/sounds/shahringan.mp4"
            muted
            autoPlay
            loop
            playsInline
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-yellow-300 font-bold text-lg font-cinzel bg-black bg-opacity-60 px-3 py-1 rounded-full shadow-md">
            🔮 {frontText}
          </div>
        </div>

        {/* Back Side */}
        <div
          className="absolute w-full h-full rounded-xl p-4 border-2 border-yellow-400 bg-[#1f1f1f] text-yellow-300 shadow-inner overflow-y-auto"
          style={{
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden"
          }}
        >
          <h3 className="text-xl font-semibold mb-2 font-cinzel">🔮 Interpretation</h3>
          <p className="whitespace-pre-wrap leading-relaxed text-sm font-cormorant">
            {backText}
          </p>
        </div>
      </div>
    </div>
  )
}
