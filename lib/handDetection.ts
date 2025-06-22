// lib/handDetection.ts
import {
  FilesetResolver,
  HandLandmarker,
  DrawingUtils,
  HandLandmarkerResult
} from '@mediapipe/tasks-vision'

let handLandmarker: HandLandmarker | null = null

export const loadHandModel = async () => {
  if (handLandmarker) return handLandmarker

  const vision = await FilesetResolver.forVisionTasks(
    'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision/wasm'
  )

  handLandmarker = await HandLandmarker.createFromOptions(vision, {
    baseOptions: {
      modelAssetPath: `https://storage.googleapis.com/mediapipe-assets/hand_landmarker.task`
    },
    runningMode: 'IMAGE',
    numHands: 2
  })

  return handLandmarker
}

export const detectHands = async (img: HTMLImageElement) => {
  const model = await loadHandModel()
  return model.detect(img)
}
