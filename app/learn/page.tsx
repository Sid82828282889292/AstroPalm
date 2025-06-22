import Link from 'next/link'
import { Button } from '@/components/ui/button'
import LearnCard from '@/components/LearnCard'
import StarryBackground from '@/components/StarryBackground'

export default function LearnPage() {
  return (
    <div className="min-h-screen py-16 relative">
      <StarryBackground starsCount={40} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Learn Palmistry</h1>
          <p className="text-xl text-muted-foreground">
            Explore the ancient art of palmistry through our comprehensive guides and resources.
            Discover how to read and interpret the lines, shapes, and features found in hands.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {learnResources.map((resource, index) => (
            <LearnCard
              key={index}
              title={resource.title}
              description={resource.description}
              href={resource.href}
              image={resource.image}
              index={index}
            />
          ))}
        </div>
        
        <div className="mystical-card max-w-4xl mx-auto mb-16">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Start Your Palmistry Journey</h2>
            <p className="text-lg text-muted-foreground">
              Learning to read palms is a rewarding practice that connects you with an ancient tradition.
              Begin with these fundamentals to build your palmistry skills.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {startingPoints.map((point, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{point.title}</h3>
                  <p className="text-muted-foreground text-lg">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/palm-diagram">
              <Button className="mystical-button">
                Practice with Interactive Diagram
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mystical-card max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">
              Answers to common questions about palmistry and hand reading.
            </p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-border/40 pb-6 last:border-0">
                <h3 className="text-xl font-bold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground text-lg">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

const learnResources = [
  {
    title: "Major Palm Lines",
    description: "Learn to identify and interpret the Heart, Head, Life, and Fate lines. Discover what each line reveals about different aspects of your life journey.",
    href: "/learn/major-lines",
    image: "https://images.pexels.com/photos/8100784/pexels-photo-8100784.jpeg"
  },
  {
    title: "Hand Shapes",
    description: "Explore the four elemental hand types (Earth, Air, Water, Fire) and what each reveals about your personality, strengths, and approach to life.",
    href: "/learn/hand-shapes",
    image: "https://images.pexels.com/photos/7108244/pexels-photo-7108244.jpeg"
  },
  {
    title: "Finger Length & Meaning",
    description: "Understand what the length and shape of your fingers indicate about your character traits, communication style, and natural talents.",
    href: "/learn/finger-meaning",
    image: "https://images.pexels.com/photos/6914330/pexels-photo-6914330.jpeg"
  },
  {
    title: "Mounts & Plains",
    description: "Discover how the fleshy pads on your palm connect to planetary influences and reveal insights about different aspects of your character.",
    href: "/learn/mounts-plains",
    image: "https://images.pexels.com/photos/5431201/pexels-photo-5431201.jpeg"
  },
  {
    title: "Special Markings",
    description: "Learn to identify and interpret islands, crosses, stars, triangles, and other special markings that add depth to palm readings.",
    href: "/learn/special-markings",
    image: "https://images.pexels.com/photos/8100783/pexels-photo-8100783.jpeg"
  },
  {
    title: "Thumb Analysis",
    description: "Explore how the flexibility, shape, and length of your thumb reveals insights about your willpower, logic, and emotional control.",
    href: "/learn/thumb-analysis",
    image: "https://images.pexels.com/photos/6914326/pexels-photo-6914326.jpeg"
  }
]

const startingPoints = [
  {
    title: "Observe Both Hands",
    description: "The non-dominant hand shows potential and inherent traits, while the dominant hand reveals how you've developed these traits."
  },
  {
    title: "Begin with Hand Shape",
    description: "Identify whether the hand is Earth (broad, square), Air (rectangular, long fingers), Water (oval, long fingers), or Fire (rectangular, short fingers)."
  },
  {
    title: "Study Major Lines",
    description: "Focus first on the Heart, Head, and Life lines—the three primary lines present in almost every palm."
  },
  {
    title: "Note Line Quality",
    description: "Pay attention to the depth, clarity, color, and length of lines, as these qualities add significant meaning to the interpretation."
  }
]

const faqs = [
  {
    question: "Is palmistry scientific?",
    answer: "Palmistry is considered an esoteric art rather than a science. While it lacks scientific validation, many practitioners find value in its insights and symbolic representations of character and life patterns."
  },
  {
    question: "Which hand should be read?",
    answer: "Traditionally, the non-dominant hand is read to understand inherent traits and potential, while the dominant hand reveals how you've developed these traits through life experience."
  },
  {
    question: "Can palm lines change?",
    answer: "Yes, palm lines can change subtly over time. Major life events, shifts in attitude, and significant personal growth can influence the depth, clarity, and even the path of certain lines."
  },
  {
    question: "Does a short life line mean a short life?",
    answer: "No. Contrary to popular belief, the life line doesn't primarily indicate longevity. It reveals vitality, energy, and major life changes rather than the length of one's life."
  }
]