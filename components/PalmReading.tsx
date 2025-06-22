// 'use client'

// import React from 'react'
// import { motion } from 'framer-motion'

// type ReadingSection = {
//   title: string
//   description: string
//   icon: string
// }

// type Props = {
//   isVisible: boolean
//   classifications: { label: string; value: string }[]
//   prediction: string
// }

// const lineIcons: Record<string, string> = {
//   'Life Line': '🌿',
//   'Heart Line': '❤️',
//   'Head Line': '🧠',
// }

// const fadeInUp = {
//   hidden: { opacity: 0, y: 20 },
//   visible: (i: number) => ({
//     opacity: 1,
//     y: 0,
//     transition: { delay: i * 0.3 },
//   }),
// }

// export default function PalmReading({
//   isVisible,
//   classifications,
//   prediction,
// }: Props) {
//   if (!isVisible || !classifications || classifications.length === 0)
//     return null

//   const readingSections: ReadingSection[] = classifications.map((c) => ({
//     title: c.label,
//     description: c.value,
//     icon: lineIcons[c.label] || '✦',
//   }))

//   return (
//     <section className="mt-20 px-4 md:px-20 text-center text-gray-100">
//       <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-wide text-amber-100">
//         ✦ Your Palm Reading ✦
//       </h2>
//       <p className="mb-12 text-lg text-gray-300">
//         Based on the analysis of your palm, here are the insights revealed by your major lines.
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         {readingSections.map((section, i) => (
//           <motion.div
//             key={section.title}
//             custom={i}
//             initial="hidden"
//             animate="visible"
//             variants={fadeInUp}
//             className="bg-[#121212] border border-amber-200/20 rounded-2xl p-6 shadow-xl hover:shadow-amber-200/30 transition-all"
//           >
//             <div className="text-4xl mb-3">{section.icon}</div>
//             <h3 className="text-xl font-semibold text-amber-100 mb-2">{section.title}</h3>
//             <p className="text-gray-300">{section.description}</p>
//           </motion.div>
//         ))}
//       </div>

//       {prediction && (
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.2 }}
//           className="mt-16 bg-[#1a1a1a] border border-amber-200/20 rounded-xl p-6 text-left shadow-lg text-gray-300 max-w-4xl mx-auto"
//         >
//           <h3 className="text-2xl font-bold text-amber-200 mb-3">🔮 Final Interpretation</h3>
//           <pre className="whitespace-pre-wrap text-base leading-relaxed">
//             {prediction}
//           </pre>
//         </motion.div>
//       )}
//     </section>
//   )
// }


// components/PalmReading.tsx


'use client'

import React from 'react'
import { motion } from 'framer-motion'

type ReadingSection = {
  title: string
  description: string
  icon: string
}

type Props = {
  isVisible: boolean
  classifications: { label: string; value: string }[]
  prediction: string
  astrology?: {
    zodiac: string
    avatarUrl: string
    chartSvg: string
  }
}

const lineIcons: Record<string, string> = {
  'Life Line': '🌿',
  'Heart Line': '❤️',
  'Head Line': '🧠',
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.3 },
  }),
}

export default function PalmReading({
  isVisible,
  classifications,
  prediction,
  astrology
}: Props) {
  if (!isVisible || !classifications || classifications.length === 0)
    return null

  const readingSections: ReadingSection[] = classifications.map((c) => ({
    title: c.label,
    description: c.value,
    icon: lineIcons[c.label] || '✦',
  }))

  return (
    <section className="mt-20 px-4 md:px-20 text-center text-gray-100">
      <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-wide text-amber-100">
        ✦ Your Palm Reading ✦
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {readingSections.map((section, i) => (
          <motion.div
            key={section.title}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="bg-[#121212] border border-amber-200/20 rounded-2xl p-6 shadow-xl hover:shadow-amber-200/30 transition-all"
          >
            <div className="text-4xl mb-3">{section.icon}</div>
            <h3 className="text-xl font-semibold text-amber-100 mb-2">{section.title}</h3>
            <p className="text-gray-300">{section.description}</p>
          </motion.div>
        ))}
      </div>

      {prediction && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="mt-16 bg-[#1a1a1a] border border-amber-200/20 rounded-xl p-6 text-left shadow-lg text-gray-300 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-amber-200 mb-3">🔮 Final Interpretation</h3>
          <pre className="whitespace-pre-wrap text-base leading-relaxed">
            {prediction}
          </pre>
        </motion.div>
      )}

      {astrology && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="mt-20 max-w-4xl mx-auto bg-[#1a1a1a] border border-blue-200/20 rounded-xl p-6 shadow-lg"
        >
          <h3 className="text-2xl font-bold text-blue-200 mb-3">✨ Zodiac Insight: {astrology.zodiac}</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <img src={astrology.avatarUrl} alt="Zodiac Avatar" className="w-40 h-40 object-contain" />
            <div
              className="w-full max-w-md bg-white rounded-md p-2"
              dangerouslySetInnerHTML={{ __html: astrology.chartSvg }}
            />
          </div>
        </motion.div>
      )}
    </section>
  )
}
