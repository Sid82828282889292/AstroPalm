type PalmFeature = { label: string; value: string }

export function generatePalmPrediction(lines: PalmFeature[], gesture: string): string {
  let report = "🔮 Palmistry Interpretation:\n"

  lines.forEach(({ label, value }) => {
    if (label === "Life Line") {
      report += value === "Long" ? "• You have strong vitality and resilience.\n"
        : "• You may face health fluctuations—stay mindful.\n"
    }
    if (label === "Heart Line") {
      report += value === "Deep" ? "• You experience emotions deeply and passionately.\n"
        : "• You tend to be reserved in expressing love.\n"
    }
    if (label === "Head Line") {
      report += value === "Curved" ? "• You are creative and spontaneous.\n"
        : "• You have a practical and logical mindset.\n"
    }
  })

  report += `\n🖐 Gesture Detected: ${gesture || "None"}\n`

  if (gesture.includes("Peace")) {
    report += "• You are balanced, calm, and value harmony.\n"
  } else if (gesture.includes("Thumbs")) {
    report += "• Confidence and assertiveness are your strengths.\n"
  } else if (gesture.includes("Pointing")) {
    report += "• You are focused and action-oriented.\n"
  } else {
    report += "• No clear gesture — open to interpretation.\n"
  }

  return report
}
