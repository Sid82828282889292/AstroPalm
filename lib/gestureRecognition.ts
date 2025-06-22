import { NormalizedLandmark } from "@mediapipe/hands"

export function recognizeGesture(landmarks: NormalizedLandmark[]): string {
  const thumbTip = landmarks[4]
  const indexTip = landmarks[8]
  const middleTip = landmarks[12]
  const ringTip = landmarks[16]
  const pinkyTip = landmarks[20]

  const indexExtended = indexTip.y < landmarks[6].y
  const middleExtended = middleTip.y < landmarks[10].y
  const ringExtended = ringTip.y < landmarks[14].y
  const pinkyExtended = pinkyTip.y < landmarks[18].y
  const thumbExtended = thumbTip.x < landmarks[2].x

  if (thumbExtended && !indexExtended && !middleExtended && !ringExtended && !pinkyExtended)
    return "Thumbs Up 👍"
  if (indexExtended && middleExtended && !ringExtended && !pinkyExtended)
    return "Peace ✌️"
  if (indexExtended && !middleExtended && !ringExtended && !pinkyExtended)
    return "Pointing ☝️"

  return "Unknown Gesture"
}
