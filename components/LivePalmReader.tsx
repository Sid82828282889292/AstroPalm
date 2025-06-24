// "use client"

// import { useEffect, useRef, useState } from "react"
// import {
//   HandLandmarker,
//   FilesetResolver,
//   DrawingUtils
// } from "@mediapipe/tasks-vision"
// import { classifyPalmLines } from "@/lib/classifyPalmLines"
// import { recognizeGesture } from "@/lib/gestureRecognition"
// import { generatePalmPrediction } from "@/lib/palmPrediction"
// import FlipCard from "@/components/FlipCard"
// import jsPDF from "jspdf"
// import { Button } from '@/components/ui/button'

// export default function LivePalmReader() {
//   const videoRef = useRef<HTMLVideoElement>(null)
//   const canvasRef = useRef<HTMLCanvasElement>(null)
//   const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null)
//   const [results, setResults] = useState<{ label: string, value: string }[]>([])
//   const [gesture, setGesture] = useState<string>("")
//   const [prediction, setPrediction] = useState<string>("")
//   const [isSpeaking, setIsSpeaking] = useState(false)
//   const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null)
//   const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

//   useEffect(() => {
//     const load = async () => {
//       const vision = await FilesetResolver.forVisionTasks(
//         "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
//       )
//       const handLandmarker = await HandLandmarker.createFromOptions(vision, {
//         baseOptions: {
//           modelAssetPath:
//             "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
//           delegate: "GPU"
//         },
//         runningMode: "VIDEO",
//         numHands: 1,
//         minHandDetectionConfidence: 0.7,
//         minHandPresenceConfidence: 0.5,
//         minTrackingConfidence: 0.5
//       })
//       setHandLandmarker(handLandmarker)
//     }

//     load()

//     const loadVoices = () => {
//       const allVoices = window.speechSynthesis.getVoices()
//       setVoices(allVoices)
//       if (allVoices.length) setSelectedVoice(allVoices[0])
//     }

//     if (typeof window !== "undefined") {
//       if (speechSynthesis.onvoiceschanged !== undefined) {
//         speechSynthesis.onvoiceschanged = loadVoices
//       }
//       loadVoices()
//     }
//   }, [])

//   useEffect(() => {
//     if (!handLandmarker) return
//     const video = videoRef.current!
//     const canvas = canvasRef.current!
//     const ctx = canvas.getContext("2d")!

//     const startCamera = async () => {
//       const stream = await navigator.mediaDevices.getUserMedia({ video: true })
//       video.srcObject = stream
//       await video.play()

//       canvas.width = video.videoWidth
//       canvas.height = video.videoHeight

//       const utils = new DrawingUtils(ctx)

//       const frameLoop = async () => {
//         const timestampMs = performance.now()
//         const result = handLandmarker.detectForVideo(video, timestampMs)

//         ctx.clearRect(0, 0, canvas.width, canvas.height)
//         if (result.landmarks.length > 0) {
//           const landmarks = result.landmarks[0]
//           utils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, { color: "#00FF00", lineWidth: 1 })
//           utils.drawLandmarks(landmarks, { color: "#00FF00", lineWidth: 2 })

//           setResults(classifyPalmLines(landmarks))
//           setGesture(recognizeGesture(landmarks))
//         } else {
//           setResults([])
//           setGesture("")
//         }

//         requestAnimationFrame(frameLoop)
//       }
//       frameLoop()
//     }

//     startCamera()
//   }, [handLandmarker])

//   const speakPrediction = async () => {
//     if (!prediction || !window.speechSynthesis || !selectedVoice) return
//     window.speechSynthesis.cancel()

//     // 🔔 Play ding before speaking
//     const ding = new Audio("/sounds/ding.wav")
//     ding.play()

//     // Wait for ding to finish
//     await new Promise(resolve => {
//       ding.onended = resolve
//     })

//     const utter = new SpeechSynthesisUtterance(`${gesture}. ${results.map(r => `${r.label}: ${r.value}`).join(". ")}. ${prediction}`)
//     utter.voice = selectedVoice
//     utter.rate = 0.9
//     utter.onend = () => setIsSpeaking(false)
//     window.speechSynthesis.speak(utter)
//     setIsSpeaking(true)
//   }

//   const stopSpeaking = () => {
//     if (!window.speechSynthesis) return
//     window.speechSynthesis.cancel()
//     setIsSpeaking(false)
//   }

//   const takeSnapshotAndGeneratePDF = () => {
//     const canvas = canvasRef.current
//     if (!canvas) return
//     const imgData = canvas.toDataURL("image/png")
//     const pdf = new jsPDF()
//     pdf.text("Palmistry Snapshot Report", 10, 10)
//     pdf.addImage(imgData, "PNG", 15, 20, 190, 150)

//     results.forEach((r, i) => pdf.text(`${r.label}: ${r.value}`, 10, 180 + i * 10))
//     pdf.text(`Gesture: ${gesture}`, 10, 180 + results.length * 10 + 10)

//     const pred = generatePalmPrediction(results, gesture)
//     pred.split("\n").forEach((l, i) =>
//       pdf.text(l, 10, 200 + results.length * 10 + i * 8)
//     )

//     pdf.save("palmistry_report.pdf")
//     setPrediction(pred)
//   }

//   return (
//     <div className="flex flex-col items-center px-4 py-10 space-y-6 md:px-10 lg:px-20">
//       <h2 className="text-4xl font-bold text-center text-purple-200 drop-shadow-md">🔮 Live Palm Reader</h2>

//       <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden border-4 border-purple-500 shadow-2xl">
//         <video ref={videoRef} className="absolute w-full h-full object-cover" muted playsInline />
//         <canvas ref={canvasRef} className="absolute w-full h-full" />
//       </div>

//       <Button onClick={takeSnapshotAndGeneratePDF} className="mystical-button">
//         📸 Take Snapshot & Generate Report
//       </Button>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
//         <div className="bg-purple-100 bg-opacity-10 border border-purple-300 p-4 rounded-lg shadow">
//           <h3 className="text-2xl font-semibold mb-2 text-purple-100">Palm Line Classification</h3>
//           {results.length ? results.map((r, i) => (
//             <div key={i} className="p-2 mb-2 bg-purple-50 bg-opacity-10 border border-purple-300 rounded-md">
//               <p className="text-sm text-purple-300">{r.label}</p>
//               <p className="text-lg font-semibold text-white">{r.value}</p>
//             </div>
//           )) : (
//             <p className="text-sm text-purple-200 italic">No hand detected</p>
//           )}
//         </div>

//         <div className="bg-purple-100 bg-opacity-10 border border-purple-300 p-4 rounded-lg shadow">
//           <h3 className="text-2xl font-semibold mb-2 text-purple-100">Recognized Gesture</h3>
//           <p className="text-xl text-white">{gesture || "Detecting..."}</p>
//         </div>
//       </div>

//       {prediction && (
//         <div className="w-full max-w-5xl mt-6 flex flex-col items-center space-y-4">
//           <div className="flex flex-wrap justify-center gap-6">
//             {prediction.split(". ").slice(0, 3).map((text, index) => (
//               <FlipCard key={index} frontVideoUrl="https://cdn.pixabay.com/vimeo/771523644/mystic-loop-1080p.mp4?width=640&hash=2ddf038b4f3bd550d53c1439a9cc76e122e1b77f" backText={text.trim()} />
//             ))}
//           </div>

//           <div className="flex gap-4 items-center mt-4">
//             <select
//               value={selectedVoice?.name}
//               onChange={(e) =>
//                 setSelectedVoice(voices.find(v => v.name === e.target.value) || null)
//               }
//               className="px-4 py-2 rounded-md bg-muted text-white border border-purple-400"
//             >
//               {voices.map((voice, i) => (
//                 <option key={i} value={voice.name}>
//                   {voice.name} {voice.lang.includes("en") ? "🌐" : ""}
//                 </option>
//               ))}
//             </select>

//             <Button onClick={speakPrediction} className="mystical-button">
//               🔊 Speak Reading
//             </Button>
//             <Button onClick={stopSpeaking} className="mystical-button bg-red-500 hover:bg-red-600">
//               ⏹ Stop
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }


"use client"

import { useEffect, useRef, useState } from "react"
import {
  HandLandmarker,
  FilesetResolver,
  DrawingUtils
} from "@mediapipe/tasks-vision"
import { classifyPalmLines } from "@/lib/classifyPalmLines"
import { recognizeGesture } from "@/lib/gestureRecognition"
import { generatePalmPrediction } from "@/lib/palmPrediction"
import FlipCard from "@/components/FlipCard"
import jsPDF from "jspdf"
import { Button } from '@/components/ui/button'

export default function LivePalmReader() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null)
  const [results, setResults] = useState<{ label: string, value: string }[]>([])
  const [gesture, setGesture] = useState<string>("")
  const [prediction, setPrediction] = useState<string>("")
  const [selectedVoice, setSelectedVoice] = useState<string>("")

  // Load voice options
  useEffect(() => {
    const handleVoicesChanged = () => {
      const voices = window.speechSynthesis.getVoices()
      if (voices.length && !selectedVoice) setSelectedVoice(voices[0].name)
    }
    window.speechSynthesis.onvoiceschanged = handleVoicesChanged
    handleVoicesChanged()
  }, [])

  // Load MediaPipe HandLandmarker
  useEffect(() => {
    const load = async () => {
      const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm")
      const handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
          delegate: "GPU"
        },
        runningMode: "VIDEO",
        numHands: 1,
        minHandDetectionConfidence: 0.7,
        minHandPresenceConfidence: 0.5,
        minTrackingConfidence: 0.5
      })
      setHandLandmarker(handLandmarker)
    }

    load()
  }, [])

  // Start webcam and analyze
  useEffect(() => {
    if (!handLandmarker) return

    const video = videoRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      video.srcObject = stream
      await video.play()

      await new Promise<void>((resolve) => {
        const check = () => {
          if (video.videoWidth && video.videoHeight) resolve()
          else requestAnimationFrame(check)
        }
        check()
      })

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const utils = new DrawingUtils(ctx)

      const detectLoop = async () => {
        const ts = performance.now()

        if (video.videoWidth === 0 || video.videoHeight === 0) {
          requestAnimationFrame(detectLoop)
          return
        }

        try {
          const result = handLandmarker.detectForVideo(video, ts)
          ctx.clearRect(0, 0, canvas.width, canvas.height)

          if (result.landmarks.length > 0) {
            const landmarks = result.landmarks[0]
            utils.drawConnectors(landmarks, HandLandmarker.HAND_CONNECTIONS, { color: "#00FF00", lineWidth: 1 })
            utils.drawLandmarks(landmarks, { color: "#00FF00", lineWidth: 2 })
            setResults(classifyPalmLines(landmarks))
            setGesture(recognizeGesture(landmarks))
          } else {
            setResults([])
            setGesture("")
          }
        } catch (err) {
          console.error("Hand detection error:", err)
        }

        requestAnimationFrame(detectLoop)
      }

      detectLoop()
    }

    startCamera()
  }, [handLandmarker])

  const handleSpeak = () => {
    if (!prediction) return

    const text = `${gesture}. ${results.map(r => `${r.label}: ${r.value}`).join(". ")}. ${prediction}`
    const utter = new SpeechSynthesisUtterance(text)
    const voice = window.speechSynthesis.getVoices().find(v => v.name === selectedVoice)
    if (voice) utter.voice = voice
    utter.rate = 0.9

    const ding = new Audio("/sounds/ding.mp3")
    ding.play()
    setTimeout(() => {
      window.speechSynthesis.speak(utter)
    }, 600)
  }

  const handleStop = () => {
    window.speechSynthesis.cancel()
  }

  const takeSnapshotAndGeneratePDF = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const imgData = canvas.toDataURL("image/png")
    const pdf = new jsPDF()
    pdf.text("Palmistry Snapshot Report", 10, 10)
    pdf.addImage(imgData, "PNG", 15, 20, 190, 150)

    results.forEach((r, i) => pdf.text(`${r.label}: ${r.value}`, 10, 180 + i * 10))
    pdf.text(`Gesture: ${gesture}`, 10, 180 + results.length * 10 + 10)

    const pred = generatePalmPrediction(results, gesture)
    pred.split("\n").forEach((l, i) => pdf.text(l, 10, 200 + results.length * 10 + i * 8))
    pdf.save("palmistry_report.pdf")
    setPrediction(pred)
  }

  return (
    <div className="flex flex-col items-center px-4 py-10 space-y-6 md:px-10 lg:px-20 mb-40">
      <h2 className="text-4xl font-bold text-center text-purple-200 drop-shadow-md">🔮 Live Palm Reader</h2>

      <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden border-4 border-purple-500 shadow-2xl">
        <video ref={videoRef} className="absolute w-full h-full object-cover" muted playsInline />
        <canvas ref={canvasRef} className="absolute w-full h-full" />
      </div>

      <Button onClick={takeSnapshotAndGeneratePDF} className="mystical-button">
        📸 Take Snapshot & Generate Report
      </Button>

      {/* Voice Controls */}
      <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
        <select
          className="bg-background border border-purple-400 text-purple-200 px-4 py-2 rounded-md"
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
        >
          {typeof window !== "undefined" &&
            window.speechSynthesis.getVoices().map((voice, idx) => (
              <option key={idx} value={voice.name}>
                {voice.name} ({voice.lang})
              </option>
            ))}
        </select>

        <button
          onClick={handleSpeak}
          className="bg-yellow-100 text-black font-semibold py-2 px-4 rounded-md shadow-md hover:bg-yellow-200 transition"
        >
          🔊 Speak Reading
        </button>

        <button
          onClick={handleStop}
          className="bg-red-600 text-white font-semibold py-2 px-4 rounded-md shadow-md hover:bg-red-700 transition"
        >
          ⛔ Stop
        </button>
      </div>

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl">
        <div className="bg-purple-100 bg-opacity-10 border border-purple-300 p-4 rounded-lg shadow">
          <h3 className="text-2xl font-semibold mb-2 text-purple-100">Palm Line Classification</h3>
          {results.length ? results.map((r, i) => (
            <div key={i} className="p-2 mb-2 bg-purple-50 bg-opacity-10 border border-purple-300 rounded-md">
              <p className="text-sm text-purple-300">{r.label}</p>
              <p className="text-lg font-semibold text-white">{r.value}</p>
            </div>
          )) : (
            <p className="text-sm text-purple-200 italic">No hand detected</p>
          )}
        </div>

        <div className="bg-purple-100 bg-opacity-10 border border-purple-300 p-4 rounded-lg shadow">
          <h3 className="text-2xl font-semibold mb-2 text-purple-100">Recognized Gesture</h3>
          <p className="text-xl text-white">{gesture || "Detecting..."}</p>
        </div>
      </div>

      {/* Cards */}
      {prediction && (
        <div className="w-full max-w-5xl mt-6 flex flex-wrap justify-center gap-6 mb-40">
          {prediction.split(". ").slice(0, 3).map((text, index) => (
            <FlipCard
              key={index}
              frontText={`Card ${index + 1}`}
              backText={text.trim()}
            />
          ))}
        </div>
      )}
    </div>
  )
}
