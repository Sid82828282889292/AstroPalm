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
import jsPDF from "jspdf"
import { Button } from '@/components/ui/button'

export default function LivePalmReader() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null)
  const [results, setResults] = useState<{ label: string, value: string }[]>([])
  const [gesture, setGesture] = useState<string>("")
  const [prediction, setPrediction] = useState<string>("")

  useEffect(() => {
    const load = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      )
      const handLandmarker = await HandLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task",
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

  useEffect(() => {
    if (!handLandmarker) return
    const video = videoRef.current!
    const canvas = canvasRef.current!
    const ctx = canvas.getContext("2d")!

    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      video.srcObject = stream
      await video.play()

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      const utils = new DrawingUtils(ctx)

      const frameLoop = async () => {
        const timestampMs = performance.now()
        const result = handLandmarker.detectForVideo(video, timestampMs)

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

        requestAnimationFrame(frameLoop)
      }
      frameLoop()
    }

    startCamera()
  }, [handLandmarker])

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
    pred.split("\n").forEach((l, i) =>
      pdf.text(l, 10, 200 + results.length * 10 + i * 8)
    )

    pdf.save("palmistry_report.pdf")
    setPrediction(pred)

    // Trigger narration
    const utter = new SpeechSynthesisUtterance(`${gesture}. ${results.map(r => `${r.label}: ${r.value}`).join(". ")}. ${pred}`)
    utter.rate = 0.9
    speechSynthesis.speak(utter)
  }

  return (
    <div className="flex flex-col items-center px-4 py-10 space-y-6 md:px-10 lg:px-20">
      <h2 className="text-4xl font-bold text-center text-purple-200 drop-shadow-md">🔮 Live Palm Reader</h2>

      <div className="relative w-full max-w-2xl aspect-video rounded-xl overflow-hidden border-4 border-purple-500 shadow-2xl">
        <video ref={videoRef} className="absolute w-full h-full object-cover" muted playsInline />
        <canvas ref={canvasRef} className="absolute w-full h-full" />
      </div>

      <Button onClick={takeSnapshotAndGeneratePDF} className="mystical-button">
        📸 Take Snapshot & Generate Report
      </Button>

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

      {prediction && (
        <div className="w-full max-w-4xl mt-6 bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-300 rounded-xl p-6 text-white shadow-xl">
          <h3 className="text-2xl font-semibold mb-3 text-center text-purple-200">🔮 Your Reading</h3>
          <p className="text-lg whitespace-pre-line">{prediction}</p>
        </div>
      )}
    </div>
  )
}
