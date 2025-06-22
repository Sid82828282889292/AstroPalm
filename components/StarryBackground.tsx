// "use client"

// import { useEffect, useRef } from 'react'
// import AuroraEffect from './ui/AuroraEffect'

// interface StarryBackgroundProps {
//   starsCount?: number
//   speed?: number
// }

// const StarryBackground = ({ 
//   starsCount = 50,
//   speed = 0.5
// }: StarryBackgroundProps) => {
//   const canvasRef = useRef<HTMLCanvasElement>(null)
  
//   useEffect(() => {
//     const canvas = canvasRef.current
//     if (!canvas) return
    
//     const ctx = canvas.getContext('2d')
//     if (!ctx) return
    
//     const stars: { x: number; y: number; radius: number; speed: number; opacity: number }[] = []
    
//     // Set canvas dimensions
//     const resize = () => {
//       canvas.width = window.innerWidth
//       canvas.height = window.innerHeight
//       initStars()
//     }
    
//     // Initialize stars
//     const initStars = () => {
//       stars.length = 0
//       for (let i = 0; i < starsCount; i++) {
//         stars.push({
//           x: Math.random() * canvas.width,
//           y: Math.random() * canvas.height,
//           radius: Math.random() * 1.5,
//           speed: Math.random() * speed + 0.1,
//           opacity: Math.random() * 0.5 + 0.3
//         })
//       }
//     }
    
//     // Animate stars
//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height)
      
//       // Draw stars
//       stars.forEach(star => {
//         ctx.beginPath()
//         ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
//         ctx.fillStyle = `rgba(223, 208, 184, ${star.opacity})`
//         ctx.fill()
        
//         // Move stars upward with slight sideways drift
//         star.y -= star.speed
//         star.x += Math.sin(star.y * 0.01) * 0.2
        
//         // Reset stars that go off-screen
//         if (star.y < -5) {
//           star.y = canvas.height + 5
//           star.x = Math.random() * canvas.width
//         }
//       })
      
//       requestAnimationFrame(animate)
//     }
    
//     // Initialize
//     window.addEventListener('resize', resize)
//     resize()
//     animate()
    
//     return () => {
//       window.removeEventListener('resize', resize)
//     }
//   }, [starsCount, speed])
  
//   return (
//     <canvas 
//       ref={canvasRef} 
//       className="stars-bg"
//       aria-hidden="true"
//     />
//   )
// }

// export default StarryBackground

"use client"

import { useEffect, useRef } from "react"
import AuroraEffect from "./ui/AuroraEffect"

interface StarryBackgroundProps {
  starsCount?: number
  speed?: number
}

const StarryBackground = ({
  starsCount = 50,
  speed = 0.5,
}: StarryBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const stars: {
      x: number
      y: number
      radius: number
      speed: number
      opacity: number
    }[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      stars.length = 0
      for (let i = 0; i < starsCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          speed: Math.random() * speed + 0.1,
          opacity: Math.random() * 0.5 + 0.3,
        })
      }
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      stars.forEach((star) => {
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(223, 208, 184, ${star.opacity})`
        ctx.fill()

        star.y -= star.speed
        star.x += Math.sin(star.y * 0.01) * 0.2

        if (star.y < -5) {
          star.y = canvas.height + 5
          star.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    window.addEventListener("resize", resize)
    resize()
    animate()

    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [starsCount, speed])

  return (
    <div className="fixed inset-0 -z-50 pointer-events-none">
      {/* Aurora behind stars */}
      <div className="absolute inset-0">
        <AuroraEffect
          colorStops={["#ff004f", "#7c00ff", "#00d8ff"]}
          amplitude={1.5}
          blend={0.4}
          speed={1.2}
        />
      </div>

      {/* Star field */}
      <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />
    </div>
  )
}

export default StarryBackground
