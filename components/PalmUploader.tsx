// 'use client'

// import { useRef, useState } from 'react'
// import Image from 'next/image'
// import { detectHands } from '@/lib/handDetection'
// import { classifyPalmLines } from '@/lib/classifyPalmLines'
// import { Upload, X, Check } from 'lucide-react'
// import { Button } from '@/components/ui/button'
// import { cn } from '@/lib/utils'

// interface PalmUploaderProps {
//   onImageUpload: (file: File) => void
// }

// const PalmUploader = ({ onImageUpload }: PalmUploaderProps) => {
//   const [image, setImage] = useState<string | null>(null)
//   const [error, setError] = useState<string | null>(null)
//   const [uploadComplete, setUploadComplete] = useState(false)
//   const [landmarkResults, setLandmarkResults] = useState<any | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const imageRef = useRef<HTMLImageElement>(null)

//   const handleFile = async (file: File) => {
//     if (!file.type.match('image.*')) return
//     setUploadComplete(false)
//     setError(null)

//     const reader = new FileReader()
//     reader.onload = async (e) => {
//       const imgSrc = e.target?.result as string
//       setImage(imgSrc)

//       setTimeout(async () => {
//         const imgElement = imageRef.current
//         if (!imgElement) return

//         const result = await detectHands(imgElement)

//         if (!result || result.landmarks.length === 0) {
//           setError('No palm detected. Upload a clear hand palm image.')
//           setImage(null)
//           return
//         }

//         setLandmarkResults(result)
//         const classifications = classifyPalmLines(result.landmarks[0])
//         console.log('Palm Line Classification:', classifications)

//         setUploadComplete(true)
//         onImageUpload(file)
//       }, 500)
//     }

//     reader.readAsDataURL(file)
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0]
//     if (file) handleFile(file)
//   }

//   const resetUpload = () => {
//     setImage(null)
//     setError(null)
//     setUploadComplete(false)
//     setLandmarkResults(null)
//     if (fileInputRef.current) fileInputRef.current.value = ''
//   }

//   return (
//     <div className="w-full max-w-xl mx-auto text-center p-4 border rounded-lg">
//       {!image ? (
//         <>
//           <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
//           <p className="mt-2">Upload a palm image (JPG/PNG)</p>
//           <Button onClick={() => fileInputRef.current?.click()} className="mt-4">
//             Select Image
//           </Button>
//           <input
//             ref={fileInputRef}
//             type="file"
//             accept="image/*"
//             className="hidden"
//             onChange={handleFileChange}
//           />
//           {error && <p className="text-red-500 mt-2">{error}</p>}
//         </>
//       ) : (
//         <div className="relative">
//           <img ref={imageRef} src={image} alt="Uploaded palm" className="rounded-md" />
//           <button onClick={resetUpload} className="absolute top-2 right-2 bg-white p-1 rounded-full">
//             <X className="h-5 w-5" />
//           </button>
//           {uploadComplete && (
//             <div className="absolute top-2 left-2 bg-green-600 text-white p-1 rounded-full">
//               <Check className="h-5 w-5" />
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   )
// }

// export default PalmUploader


'use client'

import { useRef, useState } from 'react'
import { detectHands } from '@/lib/handDetection'
import { classifyPalmLines } from '@/lib/classifyPalmLines'
import { generatePalmPrediction } from '@/lib/palmPrediction'
import { Upload, X, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PalmUploaderProps {
  onImageUpload: (file: File, classifications: { label: string; value: string }[], prediction: string) => void
}

const PalmUploader = ({ onImageUpload }: PalmUploaderProps) => {
  const [image, setImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [uploadComplete, setUploadComplete] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)

  const handleFile = async (file: File) => {
    if (!file.type.match('image.*')) return
    setUploadComplete(false)
    setError(null)

    const reader = new FileReader()
    reader.onload = async (e) => {
      const imgSrc = e.target?.result as string
      setImage(imgSrc)

      setTimeout(async () => {
        const imgElement = imageRef.current
        if (!imgElement) return

        const result = await detectHands(imgElement)

        if (!result || result.landmarks.length === 0) {
          setError('No palm detected. Upload a clear hand palm image.')
          setImage(null)
          return
        }

        const classifications = classifyPalmLines(result.landmarks[0])
        const prediction = generatePalmPrediction(classifications, '') // second param = gender or additional context if needed

        console.log('Palm Line Classification:', classifications)
        console.log('Prediction:', prediction)

        setUploadComplete(true)
        onImageUpload(file, classifications, prediction)
      }, 500)
    }

    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  const resetUpload = () => {
    setImage(null)
    setError(null)
    setUploadComplete(false)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="w-full max-w-xl mx-auto text-center p-4 border rounded-lg">
      {!image ? (
        <>
          <Upload className="h-12 w-12 text-muted-foreground mx-auto" />
          <p className="mt-2">Upload a palm image (JPG/PNG)</p>
          <Button onClick={() => fileInputRef.current?.click()} className="mt-4">
            Select Image
          </Button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </>
      ) : (
        <div className="relative">
          <img ref={imageRef} src={image} alt="Uploaded palm" className="rounded-md" />
          <button onClick={resetUpload} className="absolute top-2 right-2 bg-white p-1 rounded-full">
            <X className="h-5 w-5" />
          </button>
          {uploadComplete && (
            <div className="absolute top-2 left-2 bg-green-600 text-white p-1 rounded-full">
              <Check className="h-5 w-5" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default PalmUploader
