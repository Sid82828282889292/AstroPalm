import InteractivePalmDiagram from '@/components/InteractivePalmDiagram'
import StarryBackground from '@/components/StarryBackground'

export default function PalmDiagramPage() {
  return (
    <div className="min-h-screen py-16 relative">
      <StarryBackground starsCount={30} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Interactive Palm Diagram</h1>
          <p className="text-xl text-muted-foreground">
            Explore the major lines and features of the palm to understand their significance
            in palmistry. Hover or tap on different lines to learn their meanings.
          </p>
        </div>
        
        <div className="mystical-card max-w-6xl mx-auto p-8">
          <InteractivePalmDiagram />
        </div>
        
        <div className="max-w-3xl mx-auto mt-16">
          <div className="mystical-card">
            <h2 className="text-2xl font-bold mb-4">Understanding Palm Lines</h2>
            <p className="text-lg mb-6">
              In palmistry, each line and feature of your hand carries significant meaning. 
              The major lines are like a map of your life journey, revealing insights about 
              your personality, relationships, career, and more.
            </p>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-2 text-primary">Hand Shapes</h3>
                <p className="text-lg text-muted-foreground">
                  The four main hand types (Earth, Air, Water, and Fire) correspond to different 
                  personality traits and approaches to life. The shape of your palm and length of 
                  fingers provide the foundation for a reading.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2 text-primary">Mounts</h3>
                <p className="text-lg text-muted-foreground">
                  The fleshy pads on your palm, known as mounts, relate to different planetary 
                  influences and reveal strengths, weaknesses, and natural talents.
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-2 text-primary">Special Markings</h3>
                <p className="text-lg text-muted-foreground">
                  Islands, crosses, stars, triangles, and other marks on your palm add depth 
                  and specificity to a reading, often indicating significant life events or 
                  unique characteristics.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

