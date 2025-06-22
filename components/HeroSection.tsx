"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import StarryBackground from '@/components/StarryBackground'

const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false)
  
  useEffect(() => {
    setIsMounted(true)
  }, [])
  
  if (!isMounted) {
    return null
  }
  
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-24 bg-gradient-to-b from-background to-muted/30">
      <StarryBackground />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 ">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Discover What Your <span className="text-primary mystic-highlight">Hands Reveal</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Unlock the ancient wisdom of palmistry and explore the hidden meanings
            within the lines of your palms.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Link href="/palm-reading">
              <Button className="mystical-button text-lg px-8 py-6">
                Get Your Palm Read
              </Button>
            </Link>
          </motion.div>
          
          <motion.div 
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            {featureItems.map((item, index) => (
              <div 
                key={index} 
                className="mystical-card group"
              >
                <div className="mb-4 text-primary">{item.icon}</div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-lg">{item.description}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const featureItems = [
  {
    icon: <span className="text-3xl">✋</span>,
    title: "Palm Reading",
    description: "Upload images of your palm and receive detailed interpretations of your major lines."
  },
  {
    icon: <span className="text-3xl">🔮</span>,
    title: "Accurate Insights",
    description: "Discover personality traits, strengths, and potential paths revealed in your hands."
  },
  {
    icon: <span className="text-3xl">📚</span>,
    title: "Learn Palmistry",
    description: "Explore our educational resources to understand the ancient art of hand reading."
  }
]

export default HeroSection