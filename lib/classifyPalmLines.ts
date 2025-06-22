import { NormalizedLandmark } from "@mediapipe/hands"

export const classifyPalmLines = (
  landmarks: NormalizedLandmark[]
): { label: string; value: string }[] => {
  if (!landmarks || landmarks.length === 0) return []

  const wrist = landmarks[0]
  const indexBase = landmarks[5]
  const pinkyBase = landmarks[17]
  const middleTip = landmarks[12]

  const lifeLineLength = Math.abs(wrist.y - indexBase.y)
  const heartLineDepth = Math.abs(middleTip.y - pinkyBase.y)
  const headLineCurvature = Math.abs(indexBase.x - middleTip.x)

  return [
    {
      label: "Life Line",
      value:
        lifeLineLength < 0.2
          ? "Very Long – Suggests vitality and strong constitution"
          : lifeLineLength < 0.4
          ? "Moderate – Balanced energy levels"
          : "Short – Might tire easily or need rest often",
    },
    {
      label: "Heart Line",
      value:
        heartLineDepth < 0.1
          ? "Faint – Emotionally reserved or calm"
          : heartLineDepth < 0.3
          ? "Moderate – Balanced emotional life"
          : "Deep – Intense emotional experiences",
    },
    {
      label: "Head Line",
      value:
        headLineCurvature < 0.05
          ? "Straight – Logical thinker"
          : headLineCurvature < 0.15
          ? "Slightly Curved – Practical dreamer"
          : "Curved – Highly imaginative and creative",
    },
  ]
}
