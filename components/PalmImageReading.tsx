'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PalmImageReadingProps {
  isVisible: boolean
  classifications?: string[]
  prediction?: string
}

const PalmImageReading: React.FC<PalmImageReadingProps> = ({ isVisible, classifications, prediction }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.4 }}
          className="mystical-card p-6 mt-10"
        >
          <h2 className="text-2xl font-bold mb-4 text-primary">Palm Reading Results</h2>
          
          {prediction && (
            <p className="text-lg mb-4">
              <strong>Prediction:</strong> {prediction}
            </p>
          )}
          
          {classifications && classifications.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-2">Classifications:</h3>
              <ul className="list-disc list-inside space-y-1">
                {classifications.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PalmImageReading
