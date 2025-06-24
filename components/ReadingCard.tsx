// components/ReadingCard.tsx
import { motion } from "framer-motion"
import React from "react"

interface Props {
  frontText: string
  backText: string
  reveal: boolean
}

export default function ReadingCard({ frontText, backText, reveal }: Props) {
  return (
    <motion.div
      className="card-container"
      initial={false}
      animate={reveal ? "flipped" : "default"}
      variants={{
        default: { rotateY: 0 },
        flipped: { rotateY: 180 },
      }}
      transition={{ duration: 0.8 }}
      style={{ perspective: 1000 }}
    >
      <div className="card-side front">
        <p>{frontText}</p>
      </div>
      <div className="card-side back">
        <p>{backText}</p>
      </div>
    </motion.div>
  )
}
