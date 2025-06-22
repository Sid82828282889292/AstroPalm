// "use client"

// import { useEffect, useRef, useState } from "react"
// import Webcam from "react-webcam"
// import { Hands } from "@mediapipe/hands"
// import { Camera } from "@mediapipe/camera_utils"
// import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils"
// import { HAND_CONNECTIONS } from "@mediapipe/hands"
// import { classifyPalmLines } from "@/lib/handDetection"
// import { Card } from "@/components/ui/card"
// import { cn } from "@/lib/utils"

// const LivePalmReader = () => {
//   const webcamRef = useRef<Webcam>(null)
//   const canvasRef = useRef<HTMLCanvasElement>(null)

//   const [classification, setClassification] = useState<string | null>(null)

//   const onResults = (results: any) => {
//     drawResults(results)
//     if (results.multiHandLandmarks?.length) {
//       const hand = results.multiHandLandmarks[0]
//       const result = classifyPalmLines(hand)
//       setClassification(result)
//     }
//   }

//   const drawResults = (results: any) => {
//     const canvas = canvasRef.current
//     const video = webcamRef.current?.video as HTMLVideoElement

//     if (!canvas || !video) return

//     const ctx = canvas.getContext("2d")
//     if (!ctx) return

//     canvas.width = video.videoWidth
//     canvas.height = video.videoHeight

//     ctx.clearRect(0, 0, canvas.width, canvas.height)

//     // Draw landmarks
//     if (results.multiHandLandmarks) {
//       for (const landmarks of results.multiHandLandmarks) {
//         drawConnectors(ctx, landmarks, HAND_CONNECTIONS, { color: "#00FF00", lineWidth: 2 })
//         drawLandmarks(ctx, landmarks, { color: "#FF0000", lineWidth: 1 })
//       }
//     }
//   }

//   useEffect(() => {
//     const hands = new Hands({
//       locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
//     })

//     hands.setOptions({
//       maxNumHands: 1,
//       modelComplexity: 1,
//       minDetectionConfidence: 0.7,
//       minTrackingConfidence: 0.7,
//     })

//     hands.onResults(onResults)

//     if (webcamRef.current && webcamRef.current.video) {
//       const camera = new Camera(webcamRef.current.video, {
//         onFrame: async () => {
//           await hands.send({ image: webcamRef.current!.video! })
//         },
//         width: 640,
//         height: 480,
//       })
//       camera.start()
//     }
//   }, [])

//   return (
//     <div className="w-full max-w-4xl mx-auto relative mt-8">
//       <div className="relative rounded-lg overflow-hidden">
//         <Webcam
//           ref={webcamRef}
//           className="rounded-lg"
//           style={{ width: "100%", height: "auto" }}
//         />
//         <canvas
//           ref={canvasRef}
//           className="absolute top-0 left-0"
//           style={{ width: "100%", height: "100%", pointerEvents: "none" }}
//         />
//       </div>

//       {classification && (
//         <Card className="mt-4 p-4 text-center shadow-lg bg-secondary text-secondary-foreground">
//           <h2 className="text-xl font-semibold">Palm Line Classification</h2>
//           <p className="text-lg mt-2">{classification}</p>
//         </Card>
//       )}
//     </div>
//   )
// }

// export default LivePalmReader

"use client"

import { useEffect, useRef, useState } from "react"
import * as cam from "@mediapipe/camera_utils"
import { Hands, HAND_CONNECTIONS, NormalizedLandmark } from "@mediapipe/hands"
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils"
import { classifyPalmLines } from "@/lib/classifyPalmLines"
import { recognizeGesture } from "@/lib/gestureRecognition"
import { generatePalmPrediction } from "@/lib/palmPrediction"
import jsPDF from "jspdf"
import { Button } from '@/components/ui/button'

const LivePalmReader = () => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [results, setResults] = useState<{ label: string, value: string }[]>([])
  const [gesture, setGesture] = useState<string>("")
  const [snapshotDataUrl, setSnapshotDataUrl] = useState<string | null>(null)

  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    })

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.5,
    })

    hands.onResults((res) => {
      if (canvasRef.current && res.multiHandLandmarks?.length > 0) {
        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        ctx.clearRect(0, 0, canvas.width, canvas.height)

        const landmarks = res.multiHandLandmarks[0] as NormalizedLandmark[]
        drawLandmarks(ctx, landmarks, { color: "#00FF00", lineWidth: 2 })
        drawConnectors(ctx, landmarks, HAND_CONNECTIONS, { color: "#00FF00", lineWidth: 1 })

        const classification = classifyPalmLines(landmarks)
        setResults(classification)

        const gestureDetected = recognizeGesture(landmarks)
        setGesture(gestureDetected)
      } else {
        setResults([])
        setGesture("")
      }
    })

    const initCamera = async () => {
      const camera = new cam.Camera(videoRef.current!, {
        onFrame: async () => {
          await hands.send({ image: videoRef.current! })
        },
        width: 640,
        height: 480,
      })
      camera.start()
    }

    initCamera()
  }, [])

  const takeSnapshotAndGeneratePDF = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const imageData = canvas.toDataURL("image/png")
    setSnapshotDataUrl(imageData)

    const pdf = new jsPDF()
    pdf.text("Palmistry Snapshot Report", 10, 10)
    pdf.addImage(imageData, "PNG", 15, 20, 190, 150)

    results.forEach((res, index) => {
      pdf.text(`${res.label}: ${res.value}`, 10, 180 + index * 10)
    })

    pdf.text(`Gesture: ${gesture}`, 10, 180 + results.length * 10 + 10)

    const prediction = generatePalmPrediction(results, gesture)
    const lines = prediction.split("\n")
    lines.forEach((line, i) => {
      pdf.text(line, 10, 200 + results.length * 10 + i * 8)
    })

    pdf.save("palmistry_report.pdf")
  }

  return (
    <div className="flex flex-col items-center py-10 space-y-4">
      <h2 className="text-3xl font-bold mb-4">Live Palm Reader</h2>
      <div className="relative w-[640px] h-[480px]">
        <video ref={videoRef} className="absolute w-full h-full" autoPlay playsInline muted />
        <canvas ref={canvasRef} className="absolute w-full h-full" />
      </div>
      <Button
        onClick={takeSnapshotAndGeneratePDF}
        className="mystical-button mt-4">
        📸 Take Snapshot & Generate Report
      </Button>

      <div className="w-full max-w-xl bg-muted p-4 rounded-lg shadow-md mt-4">
        <h3 className="text-xl font-semibold mb-2">Palm Line Classification</h3>
        {results.length > 0 ? (
          results.map((res, i) => (
            <div key={i} className="p-2 rounded-lg mb-2 bg-background border border-border">
              <p className="font-medium">{res.label}:</p>
              <p className="text-primary">{res.value}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted-foreground">No hand detected</p>
        )}
      </div>

      <div className="w-full max-w-xl bg-muted p-4 rounded-lg shadow-md mt-2">
        <h3 className="text-xl font-semibold mb-2">Recognized Gesture</h3>
        <p className="text-lg">{gesture || "Detecting..."}</p>
      </div>
    </div>
  )
}

export default LivePalmReader