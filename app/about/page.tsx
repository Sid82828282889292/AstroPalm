import Image from 'next/image'
import TimelineItem from '@/components/TimelineItem'
import StarryBackground from '@/components/StarryBackground'

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16 relative">
      <StarryBackground starsCount={40} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Palmistry</h1>
          <p className="text-xl text-muted-foreground">
            Explore the rich history and cultural significance of the ancient art of palmistry.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">The Ancient Art of Hand Reading</h2>
            <p className="text-lg text-muted-foreground mb-4">
              Palmistry, also known as chiromancy, is the practice of telling fortunes from the lines, marks, and patterns on the hands, particularly the palms. It has roots in ancient Indian astrology and was later adopted by the Chinese, Tibetans, Persians, Egyptians, and Greeks.
            </p>
            <p className="text-lg text-muted-foreground mb-4">
              Throughout history, palmistry has been both celebrated as a window into human character and destiny, and dismissed as mere superstition. Today, it continues to fascinate as both a cultural tradition and a tool for self-reflection.
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-lg my-6">
              "The hand is the visible part of the brain."
              <footer className="text-primary mt-2">— Immanuel Kant</footer>
            </blockquote>
          </div>
          
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://images.pexels.com/photos/5431184/pexels-photo-5431184.jpeg"
              alt="Ancient palmistry illustration"
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="mystical-card max-w-4xl mx-auto mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">The Journey of Palmistry Through Time</h2>
          <div className="py-8">
            {timelineEvents.map((event, index) => (
              <TimelineItem
                key={index}
                year={event.year}
                title={event.title}
                description={event.description}
                isLeft={index % 2 === 0}
              />
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {culturalPractices.map((practice, index) => (
            <div key={index} className="mystical-card">
              <h3 className="text-xl font-bold mb-4">{practice.region}</h3>
              <p className="text-lg text-muted-foreground">
                {practice.description}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mystical-card max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Modern Perspectives</h2>
          <p className="text-lg text-muted-foreground mb-6">
            Today, palmistry is practiced worldwide with various approaches:
          </p>
          
          <div className="space-y-6">
            {modernPerspectives.map((perspective, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary">
                  {perspective.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{perspective.title}</h3>
                  <p className="text-muted-foreground text-lg">{perspective.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const timelineEvents = [
  {
    year: "3000 BCE",
    title: "Origins in Ancient India",
    description: "Early evidence of palmistry appears in Hindu astrology texts and the Vedas."
  },
  {
    year: "500 BCE",
    title: "Greek Adoption",
    description: "Aristotle discovers a treatise on palmistry and shares this knowledge with Alexander the Great."
  },
  {
    year: "100 CE",
    title: "Roman Empire",
    description: "Palmistry spreads throughout the Roman world, often practiced alongside astrology."
  },
  {
    year: "Middle Ages",
    title: "European Transition",
    description: "The practice becomes associated with Romani (gypsy) culture in Europe."
  },
  {
    year: "1400s",
    title: "Renaissance Interest",
    description: "Renewed scholarly interest emerges with works like 'The Book of the Palm' by Johann Hartlieb."
  },
  {
    year: "1800s",
    title: "Scientific Approach",
    description: "Casimir Stanislas d'Arpentigny and Adrien Adolphe Desbarrolles develop more systematic approaches."
  },
  {
    year: "Early 1900s",
    title: "Modern Revival",
    description: "William Benham publishes 'The Laws of Scientific Hand Reading,' bringing a more analytical approach."
  },
  {
    year: "Present Day",
    title: "Contemporary Practice",
    description: "Palmistry continues worldwide as both a spiritual practice and a tool for personality assessment."
  }
]

const culturalPractices = [
  {
    region: "Indian Tradition",
    description: "In India, palmistry (Hasta Samudrika Shastra) is closely tied to Vedic astrology and is considered one of the limbs of Jyotish. It focuses on both character analysis and prediction."
  },
  {
    region: "Chinese Approach",
    description: "Chinese palmistry (Shou Xiang) is part of physiognomy and emphasizes the shape, color, and texture of the hand as well as lines. It's often practiced alongside face reading."
  },
  {
    region: "Western Practice",
    description: "Western palmistry draws from Greek, Roman, and medieval traditions. It typically focuses on the major lines, mounts, and special markings, with less emphasis on hand shape."
  }
]

const modernPerspectives = [
  {
    icon: "🧠",
    title: "Psychological Approach",
    description: "Some modern practitioners view palmistry as a tool for psychological insight rather than prediction, similar to techniques like the Rorschach test or dream analysis."
  },
  {
    icon: "🔬",
    title: "Scientific Interest",
    description: "Dermatoglyphics, the scientific study of fingerprints and palm patterns, has found correlations between certain hand features and genetic conditions."
  },
  {
    icon: "🌿",
    title: "Holistic Wellness",
    description: "Many contemporary palmists integrate their practice with other holistic modalities like energy healing, aromatherapy, or meditation for a more comprehensive approach."
  },
  {
    icon: "🔄",
    title: "Self-Development",
    description: "There's a growing emphasis on using palmistry for self-awareness and personal growth rather than deterministic fortune-telling."
  }
]