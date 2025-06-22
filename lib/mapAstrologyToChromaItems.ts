import { ChromaItem } from "@/components/ChromaGrid"

export function mapAstrologyToChromaItems(planetsData: Record<string, any>): ChromaItem[] {
  const colors = [
    "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#EF4444", "#06B6D4", "#F43F5E", "#84CC16", "#EC4899"
  ];

  const gradients = [
    "145deg", "210deg", "165deg", "195deg", "225deg", "135deg", "175deg", "200deg", "190deg"
  ];

  return Object.entries(planetsData).map(([planetName, data], i) => ({
    image: `/planet-images/${planetName.toLowerCase()}.png`, // Store local planet icons here
    title: planetName,
    subtitle: `${data.fullDegree} | ${data.sign} ${data.signDegree}`,
    handle: data.retro ? "Retrograde" : "",
    borderColor: colors[i % colors.length],
    gradient: `linear-gradient(${gradients[i % gradients.length]}, ${colors[i % colors.length]}, #000)`,
  }))
}
