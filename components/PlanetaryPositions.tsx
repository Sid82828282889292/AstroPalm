'use client'

import React, { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'

interface Planet {
  planet: string
  zodiac_sign_name: string
  degrees: string
  minutes: string
  nakshatra_name?: string
  house_number?: string
  isRetro?: string
}

interface PlanetaryPositionsProps {
  planets: Planet[]
}

export const PlanetaryPositions: React.FC<PlanetaryPositionsProps> = ({ planets }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setCursorPos({ x, y })
    }

    const container = containerRef.current
    container?.addEventListener('mousemove', handleMouseMove)

    return () => container?.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const distance = (x1: number, y1: number, x2: number, y2: number) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)

  return (
    <section className="w-full py-16 relative z-10">
      <h2 className="text-3xl font-bold text-center mb-8 text-pink-400">
        🪐 Planetary Positions
      </h2>
      <div
        ref={containerRef}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4"
      >
        {planets.map((planet, i) => {
          const ref = useRef<HTMLDivElement>(null)

          useEffect(() => {
            const animate = () => {
              const el = ref.current
              const box = el?.getBoundingClientRect()
              const parent = containerRef.current?.getBoundingClientRect()
              if (!el || !box || !parent) return

              const x = box.left - parent.left + box.width / 2
              const y = box.top - parent.top + box.height / 2
              const d = distance(x, y, cursorPos.x, cursorPos.y)

              const grayscale = d < 150 ? 0 : 1
              gsap.to(el, {
                filter: `grayscale(${grayscale})`,
                scale: d < 150 ? 1.05 : 1,
                duration: 0.3,
              })
            }

            animate()
          }, [cursorPos])

          return (
            <div
              key={i}
              ref={ref}
              className="relative p-5 rounded-xl border border-pink-800/20 bg-gradient-to-br from-[#221020] to-[#111]"
            >
              <img
                src={`/planet-images/${planet.planet.toLowerCase()}.jpg`}
                onError={(e) => {
                  e.currentTarget.onerror = null
                  e.currentTarget.src = '/planet-images/sun.jpg'
                }}
                alt={planet.planet}
                className="w-full h-32 object-contain rounded mb-3"
              />
              <h4 className="text-lg font-bold text-white mb-1">{planet.planet}</h4>
              <p className="text-sm text-pink-100 leading-relaxed">
                Sign: {planet.zodiac_sign_name}<br />
                Degree: {planet.degrees}° {planet.minutes}'<br />
                Nakshatra: {planet.nakshatra_name || '—'}<br />
                House: {planet.house_number ?? '—'}<br />
                Retrograde: {planet.isRetro === 'true' ? 'Yes' : 'No'}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default PlanetaryPositions


// 'use client'

// import React, { useRef, useEffect, useState } from 'react'
// import { gsap } from 'gsap'

// interface Planet {
//   planet: string
//   zodiac_sign_name: string
//   degrees: string
//   minutes: string
//   nakshatra_name?: string
//   house_number?: string
//   isRetro?: string
// }

// interface PlanetaryPositionsProps {
//   planets: Planet[]
// }

// export const PlanetaryPositions: React.FC<PlanetaryPositionsProps> = ({ planets }) => {
//   const containerRef = useRef<HTMLDivElement>(null)
//   const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 })
//   const cardRefs = useRef<(HTMLDivElement | null)[]>([])

//   useEffect(() => {
//     const handleMouseMove = (e: MouseEvent) => {
//       const rect = containerRef.current?.getBoundingClientRect()
//       if (!rect) return
//       const x = e.clientX - rect.left
//       const y = e.clientY - rect.top
//       setCursorPos({ x, y })
//     }

//     const container = containerRef.current
//     container?.addEventListener('mousemove', handleMouseMove)

//     return () => container?.removeEventListener('mousemove', handleMouseMove)
//   }, [])

//   useEffect(() => {
//     const containerRect = containerRef.current?.getBoundingClientRect()
//     if (!containerRect) return

//     cardRefs.current.forEach((el) => {
//       if (!el) return

//       const rect = el.getBoundingClientRect()
//       const centerX = rect.left - containerRect.left + rect.width / 2
//       const centerY = rect.top - containerRect.top + rect.height / 2
//       const dist = Math.sqrt((centerX - cursorPos.x) ** 2 + (centerY - cursorPos.y) ** 2)

//       const grayscale = dist < 150 ? 0 : 1
//       const scale = dist < 150 ? 1.05 : 1

//       gsap.to(el, {
//         filter: `grayscale(${grayscale})`,
//         scale,
//         duration: 0.25,
//         ease: 'power2.out',
//       })
//     })
//   }, [cursorPos])

//   return (
//     <section className="w-full py-16 relative z-10">
//       <h2 className="text-3xl font-bold text-center mb-8 text-pink-400">
//         🪐 Planetary Positions
//       </h2>
//       <div
//         ref={containerRef}
//         className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 relative"
//       >
//         {planets.map((planet, i) => (
//           <div
//             key={i}
//             ref={(el) => (cardRefs.current[i] = el)}
//             className="relative p-5 rounded-xl border border-pink-800/20 bg-gradient-to-br from-[#221020] to-[#111] transition-all duration-200"
//           >
//             <img
//               src={`/planet-images/${planet.planet.toLowerCase()}.jpg`}
//               onError={(e) => {
//                 e.currentTarget.onerror = null
//                 e.currentTarget.src = '/planet-images/sun.jpg'
//               }}
//               alt={planet.planet}
//               className="w-full h-32 object-contain rounded mb-3"
//             />
//             <h4 className="text-lg font-bold text-white mb-1">{planet.planet}</h4>
//             <p className="text-sm text-pink-100 leading-relaxed">
//               Sign: {planet.zodiac_sign_name}<br />
//               Degree: {planet.degrees}° {planet.minutes}'<br />
//               Nakshatra: {planet.nakshatra_name || '—'}<br />
//               House: {planet.house_number ?? '—'}<br />
//               Retrograde: {planet.isRetro === 'true' ? 'Yes' : 'No'}
//             </p>
//           </div>
//         ))}
//       </div>
//     </section>
//   )
// }
