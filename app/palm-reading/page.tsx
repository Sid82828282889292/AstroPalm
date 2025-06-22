// "use client"

// import { useState } from 'react'
// import PalmUploader from '@/components/PalmUploader'
// import PalmReading from '@/components/PalmReading'
// import StarryBackground from '@/components/StarryBackground'
// import { Button } from '@/components/ui/button'
// import { RotateCcw } from 'lucide-react'

// export default function PalmReadingPage() {
//   const [uploadedFile, setUploadedFile] = useState<File | null>(null)
//   const [showReading, setShowReading] = useState(false)

//   const [classifications, setClassifications] = useState<
//     { label: string; value: string }[]
//   >([])

//   const [prediction, setPrediction] = useState("")

//   const handleImageUpload = (file: File) => {
//     setUploadedFile(file)
    
//     // Simulate classification logic based on image processing
//     setTimeout(() => {
//       // These could come from ML model results in the future
//       const generatedClassifications = [
//         {
//           label: "Life Line",
//           value: "Your life is full of vibrant energy and strong willpower."
//         },
//         {
//           label: "Heart Line",
//           value: "You tend to love deeply and seek emotional honesty."
//         },
//         {
//           label: "Head Line",
//           value: "Your mind is sharp, analytical, and creative."
//         }
//       ]

//       const generatedPrediction =
//         "You are a balanced individual with emotional depth and intellectual strength. A stable yet adventurous life path lies ahead, shaped by resilience and thoughtful decisions."

//       setClassifications(generatedClassifications)
//       setPrediction(generatedPrediction)
//       setShowReading(true)
//     }, 2000)
//   }

//   const handleReset = () => {
//     setUploadedFile(null)
//     setShowReading(false)
//     setClassifications([])
//     setPrediction("")
//   }

//   return (
//     <div className="min-h-screen py-16 relative">
//       <StarryBackground starsCount={70} />

//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="max-w-3xl mx-auto text-center mb-12">
//           <h1 className="text-4xl font-bold mb-4">Palm Reading</h1>
//           <p className="text-xl text-muted-foreground">
//             Upload an image of your palm to receive a personalized reading that reveals
//             insights about your personality, relationships, and life path.
//           </p>
//         </div>

//         <div className="mystical-card max-w-4xl mx-auto">
//           <div className="text-center mb-8">
//             <h2 className="text-2xl font-bold mb-2">Upload Your Palm</h2>
//             <p className="text-lg text-muted-foreground">
//               For best results, upload a clear image of your dominant hand with palm facing up
//               and fingers spread slightly.
//             </p>
//           </div>

//           <PalmUploader onImageUpload={handleImageUpload} />

//           {uploadedFile && (
//             <div className="text-center mt-8">
//               <p className="text-lg mb-4">
//                 {showReading
//                   ? "Your palm reading is ready!"
//                   : "Analyzing your palm lines and features..."}
//               </p>

//               {showReading && (
//                 <Button
//                   onClick={handleReset}
//                   variant="outline"
//                   className="flex items-center gap-2"
//                 >
//                   <RotateCcw className="h-4 w-4" />
//                   Upload a different image
//                 </Button>
//               )}
//             </div>
//           )}
//         </div>

//         {/* Dynamically rendered PalmReading */}
//         <PalmReading
//           isVisible={showReading}
//           classifications={classifications}
//           prediction={prediction}
//         />
//       </div>
//     </div>
//   )
// }
"use client"

import { useState } from 'react'
import PalmUploader from '@/components/PalmUploader'
import PalmReading from '@/components/PalmReading'
import StarryBackground from '@/components/StarryBackground'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'

export default function PalmReadingPage() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [showReading, setShowReading] = useState(false)

  const [classifications, setClassifications] = useState<
    { label: string; value: string }[]
  >([])
  const [prediction, setPrediction] = useState("")
  const [astrology, setAstrology] = useState<any>(null)

  const handleImageUpload = async (file: File) => {
    setUploadedFile(file)

    const generatedClassifications = [
      { label: "Life Line", value: "You have a strong and enduring vitality." },
      { label: "Heart Line", value: "You're emotionally open and compassionate." },
      { label: "Head Line", value: "You think deeply and creatively." }
    ]
    const generatedPrediction = "You're destined for a life of balance, insight, and meaningful connection."

    try {
      const astroRes = await fetch('/api/astrology', {
        method: 'POST',
        body: JSON.stringify({
          name: "Siddhant",
          date: "2002-12-04",         // Replace with dynamic data if needed
          time: "14:30",              // HH:MM format
          location: "New Delhi, India"
        }),
        headers: { "Content-Type": "application/json" }
      })

      const astroData = await astroRes.json()
      setAstrology(astroData)
    } catch (err) {
      console.error("Astrology API failed", err)
      setAstrology(null)
    }

    setClassifications(generatedClassifications)
    setPrediction(generatedPrediction)
    setShowReading(true)
  }

  const handleReset = () => {
    setUploadedFile(null)
    setShowReading(false)
    setClassifications([])
    setPrediction("")
    setAstrology(null)
  }

  return (
    <div className="min-h-screen py-16 relative">
      <StarryBackground starsCount={70} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Palm Reading</h1>
          <p className="text-xl text-muted-foreground">
            Upload your palm to receive a personalized palm + astrology reading.
          </p>
        </div>

        <div className="mystical-card max-w-4xl mx-auto">
          <PalmUploader onImageUpload={handleImageUpload} />

          {uploadedFile && (
            <div className="text-center mt-8">
              <p className="text-lg mb-4">
                {showReading
                  ? "Your complete cosmic reading is ready!"
                  : "Analyzing palm + birth chart..."}
              </p>

              {showReading && (
                <Button onClick={handleReset} variant="outline" className="flex items-center gap-2">
                  <RotateCcw className="h-4 w-4" />
                  Try Again
                </Button>
              )}
            </div>
          )}
        </div>

        <PalmReading
          isVisible={showReading}
          classifications={classifications}
          prediction={prediction}
          astrology={astrology}
        />
      </div>
    </div>
  )
}
