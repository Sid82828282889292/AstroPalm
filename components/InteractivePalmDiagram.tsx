"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface PalmLine {
  id: string
  name: string
  description: string
  path: string
  viewBox: string
}

const InteractivePalmDiagram = () => {
  const [activeLine, setActiveLine] = useState<string | null>(null)
  
  const handleLineHover = (lineId: string) => {
    setActiveLine(lineId)
  }
  
  const handleLineLeave = () => {
    setActiveLine(null)
  }
  
  return (
    <div className="flex flex-col md:flex-row items-center gap-8 max-w-6xl mx-auto">
      <div className="w-full md:w-1/2 relative">
        <div className="aspect-square max-w-md mx-auto relative">
          <svg
            viewBox="0 0 300 400"
            className="w-full h-full drop-shadow-lg"
          >
            {/* Palm outline */}
            <path
              d="M100,40 C60,60 40,120 40,180 C40,220 40,280 80,340 C100,370 140,390 150,395 C160,390 200,370 220,340 C260,280 260,220 260,180 C260,120 240,60 200,40 C180,30 150,25 150,25 C150,25 120,30 100,40"
              fill="#DFD0B8"
              stroke="#948979"
              strokeWidth="2"
            />
            
            {/* Palm lines */}
            {palmLines.map((line) => (
              <svg key={line.id} viewBox={line.viewBox}>
                <path
                  d={line.path}
                  fill="none"
                  stroke={activeLine === line.id ? "#948979" : "#948979"}
                  strokeWidth={activeLine === line.id ? "3" : "2"}
                  strokeLinecap="round"
                  className={cn(
                    "transition-all duration-300 cursor-pointer",
                    activeLine === line.id ? "opacity-100" : "opacity-70"
                  )}
                  onMouseEnter={() => handleLineHover(line.id)}
                  onMouseLeave={handleLineLeave}
                />
              </svg>
            ))}
            
            {/* Line labels */}
            {palmLines.map((line) => (
              <g key={`label-${line.id}`} className="cursor-pointer">
                <text
                  x={getLabel(line.id).x}
                  y={getLabel(line.id).y}
                  fill={activeLine === line.id ? "#948979" : "#948979"}
                  fontSize="10"
                  fontWeight={activeLine === line.id ? "bold" : "normal"}
                  className={cn(
                    "transition-all duration-300",
                    activeLine === line.id ? "opacity-100" : "opacity-70"
                  )}
                  onMouseEnter={() => handleLineHover(line.id)}
                  onMouseLeave={handleLineLeave}
                >
                  {line.name}
                </text>
              </g>
            ))}
          </svg>
          
          {/* Glow effect under the active line */}
          {activeLine && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-full h-full absolute">
                <svg viewBox="0 0 300 400" className="w-full h-full">
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                  
                  <svg viewBox={palmLines.find(l => l.id === activeLine)?.viewBox}>
                    <path
                      d={palmLines.find(l => l.id === activeLine)?.path}
                      fill="none"
                      stroke="#948979"
                      strokeWidth="4"
                      strokeLinecap="round"
                      filter="url(#glow)"
                      opacity="0.7"
                    />
                  </svg>
                </svg>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="w-full md:w-1/2">
        <div className="mystical-card min-h-[300px]">
          {activeLine ? (
            <motion.div
              key={activeLine}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-primary">
                {palmLines.find(l => l.id === activeLine)?.name}
              </h3>
              <p className="text-lg leading-relaxed">
                {palmLines.find(l => l.id === activeLine)?.description}
              </p>
            </motion.div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center">
              <h3 className="text-2xl font-bold mb-4">Interactive Palm Diagram</h3>
              <p className="text-lg text-muted-foreground">
                Hover over or tap on any line to learn about its meaning in palmistry.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Helper function to get label positions
const getLabel = (id: string) => {
  switch (id) {
    case 'heart':
      return { x: 190, y: 130 }
    case 'head':
      return { x: 190, y: 170 }
    case 'life':
      return { x: 110, y: 220 }
    case 'fate':
      return { x: 160, y: 240 }
    default:
      return { x: 0, y: 0 }
  }
}

// Palm line data
const palmLines: PalmLine[] = [
  {
    id: 'heart',
    name: 'Heart Line',
    description: 'The Heart Line reveals your emotional nature, attitudes toward love, and overall emotional health. It shows how you express feelings, your capacity for love, and your emotional stability. A curved line indicates a passionate nature, while a straight line suggests a more practical approach to emotions.',
    path: 'M 70,120 C 100,110 130,105 160,105 C 190,105 220,110 250,120',
    viewBox: '0 0 300 400'
  },
  {
    id: 'head',
    name: 'Head Line',
    description: 'The Head Line reflects your intellectual capabilities, communication style, and approach to learning. It reveals your thinking patterns, concentration abilities, and mental attitudes. A straight line suggests logical thinking, while a curved line indicates creativity and imagination.',
    path: 'M 70,160 C 110,160 150,170 190,165 C 220,162 240,155 260,145',
    viewBox: '0 0 300 400'
  },
  {
    id: 'life',
    name: 'Life Line',
    description: 'Contrary to popular belief, the Life Line doesn\'t primarily indicate longevity. Instead, it reveals your vitality, life energy, and resilience. It shows your physical health, major life changes, and your connection to family. A deep, long line suggests strong vitality, while islands or breaks may indicate challenges.',
    path: 'M 90,90 C 80,120 70,160 65,200 C 60,240 60,280 70,320',
    viewBox: '0 0 300 400'
  },
  {
    id: 'fate',
    name: 'Fate Line',
    description: 'The Fate Line, also called the Line of Destiny, reveals your career path, life direction, and the influence of external forces on your life. It shows how focused you are on your goals and how much control you have over your destiny. A deep, clear line suggests a strong sense of purpose.',
    path: 'M 150,350 C 150,300 150,250 150,200 C 150,170 145,140 135,110',
    viewBox: '0 0 300 400'
  }
]

export default InteractivePalmDiagram
