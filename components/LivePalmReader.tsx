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

const LivePalmReader = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [handLandmarker, setHandLandmarker] = useState<HandLandmarker | null>(null)
  const [results, setResults] = useState<{ label: string, value: string }[]>([])
  const [gesture, setGesture] = useState<string>("")

  // Load the model
  useEffect(() => {
    const load = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm"
      )
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

  // Process video and draw overlays
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
  }

  return (
    <div className="flex flex-col items-center py-10 space-y-4">
      <h2 className="text-3xl font-bold">Live Palm Reader</h2>
      <div className="relative w-[640px] h-[480px]">
        <video ref={videoRef} className="absolute w-full h-full" muted playsInline />
        <canvas ref={canvasRef} className="absolute w-full h-full" />
      </div>

      <Button onClick={takeSnapshotAndGeneratePDF} className="mystical-button">
        📸 Take Snapshot & Generate Report
      </Button>

      <div className="w-full max-w-xl bg-muted p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Palm Line Classification</h3>
        {results.length ? results.map((r, i) => (
          <div key={i} className="p-2 mb-2 bg-background border border-border rounded-lg">
            <p className="font-medium">{r.label}:</p>
            <p className="text-primary">{r.value}</p>
          </div>
        )) : (
          <p className="text-sm text-muted-foreground">No hand detected</p>
        )}
      </div>

      <div className="w-full max-w-xl bg-muted p-4 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold">Recognized Gesture</h3>
        <p className="text-lg">{gesture || "Detecting..."}</p>
      </div>
    </div>
  )
}

export default LivePalmReader
