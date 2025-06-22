// import HeroSection from '@/components/HeroSection'
// import InteractivePalmDiagram from '@/components/InteractivePalmDiagram'
// import { Button } from '@/components/ui/button'
// import Link from 'next/link'
// import Image from 'next/image'

// export default function Home() {
//   return (
//     <div className="min-h-screen">
//       <HeroSection />
      
//       <section className="py-24 bg-gradient-to-b from-background to-muted/30">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Your Palm's Wisdom</h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               The ancient art of palmistry reveals insights about your personality,
//               relationships, career path, and life journey.
//             </p>
//           </div>
          
//           <div className="max-w-7xl mx-auto">
//             <h3 className="text-2xl font-bold mb-8 text-center">Interactive Palm Diagram</h3>
//             <InteractivePalmDiagram />
//             <div className="text-center mt-12">
//               <Link href="/palm-diagram">
//                 <Button className="mystical-button">
//                   Explore Full Palm Diagram
//                 </Button>
//               </Link>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       <section className="py-24 relative overflow-hidden">
//         <div className="absolute inset-0 bg-card/50 z-0"></div>
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//             <div className="order-2 md:order-1">
//               <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Your Personal Palm Reading</h2>
//               <p className="text-xl text-muted-foreground mb-6">
//                 Upload images of your palm and discover what your unique hand features and 
//                 lines reveal about your personality, relationships, and life path.
//               </p>
//               <ul className="space-y-4 mb-8">
//                 {features.map((feature, index) => (
//                   <li key={index} className="flex items-start">
//                     <span className="text-primary mr-3">✦</span>
//                     <span className="text-lg">{feature}</span>
//                   </li>
//                 ))}
//               </ul>
//               <Link href="/palm-reading">
//                 <Button className="mystical-button">
//                   Upload Your Palm Image
//                 </Button>
//               </Link>
//               <Link href="/live-palmer">
//                 <Button className="mystical-button">
//                   Live Palm Preview
//                 </Button>
//               </Link>
            
//             <Link href="/get-astrology">
//             <Button className="mystical-button">
//               Do you want to get a detailed understanding?
//             </Button>
//           </Link>
//           </div>
            
//             <div className="order-1 md:order-2">
//               <div className="relative aspect-square max-w-md mx-auto rounded-lg overflow-hidden shadow-xl">
//                 <Image
//                   src="https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg"
//                   alt="Palm reading"
//                   fill
//                   className="object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
      
//       <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
//         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-3xl md:text-4xl font-bold mb-4">Learn the Art of Palmistry</h2>
//             <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
//               Discover the meanings behind the lines, mounts, and shapes found in hands.
//               Unlock the wisdom of this ancient practice.
//             </p>
//           </div>
          
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {learnTopics.map((topic, index) => (
//               <div key={index} className="mystical-card text-center">
//                 <div className="text-4xl text-primary mb-4">{topic.icon}</div>
//                 <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
//                 <p className="text-muted-foreground text-lg">{topic.description}</p>
//               </div>
//             ))}
//           </div>
          
//           <div className="text-center mt-12">
//             <Link href="/learn">
//               <Button className="mystical-button">
//                 Explore Learning Resources
//               </Button>
//             </Link>
//           </div>
//         </div>
//       </section>
//     </div>
//   )
// }

// const features = [
//   "Detailed analysis of your Heart, Life, Head, and Fate lines",
//   "Insights into your personality traits and characteristics",
//   "Guidance on potential life paths and career directions",
//   "Understanding of your emotional and relationship patterns"
// ]

// const learnTopics = [
//   {
//     icon: "✋",
//     title: "Hand Shapes",
//     description: "Discover the four main hand types and what they reveal about your personality."
//   },
//   {
//     icon: "⟿",
//     title: "Major Lines",
//     description: "Learn to interpret the Heart, Head, Life, and Fate lines in your palm."
//   },
//   {
//     icon: "⍚",
//     title: "Minor Lines",
//     description: "Explore the less prominent lines that add depth to your palm reading."
//   },
//   {
//     icon: "◎",
//     title: "Mounts & Patterns",
//     description: "Understand the significance of palm mounts and special markings."
//   }
// ]


import HeroSection from '@/components/HeroSection'
import InteractivePalmDiagram from '@/components/InteractivePalmDiagram'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

// ✅ Move constants to the top
const features: string[] = [
  "Detailed analysis of your Heart, Life, Head, and Fate lines",
  "Insights into your personality traits and characteristics",
  "Guidance on potential life paths and career directions",
  "Understanding of your emotional and relationship patterns"
]

const learnTopics: { icon: string; title: string; description: string }[] = [
  {
    icon: "✋",
    title: "Hand Shapes",
    description: "Discover the four main hand types and what they reveal about your personality."
  },
  {
    icon: "⟿",
    title: "Major Lines",
    description: "Learn to interpret the Heart, Head, Life, and Fate lines in your palm."
  },
  {
    icon: "⍚",
    title: "Minor Lines",
    description: "Explore the less prominent lines that add depth to your palm reading."
  },
  {
    icon: "◎",
    title: "Mounts & Patterns",
    description: "Understand the significance of palm mounts and special markings."
  }
]

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Your Palm's Wisdom</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The ancient art of palmistry reveals insights about your personality,
              relationships, career path, and life journey.
            </p>
          </div>

          <div className="max-w-7xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center">Interactive Palm Diagram</h3>
            <InteractivePalmDiagram />
            <div className="text-center mt-12">
              <Link href="/palm-diagram">
                <Button className="mystical-button">
                  Explore Full Palm Diagram
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Upload Palm Image Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-card/50 z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get Your Personal Palm Reading</h2>
              <p className="text-xl text-muted-foreground mb-6">
                Upload images of your palm and discover what your unique hand features and 
                lines reveal about your personality, relationships, and life path.
              </p>
              <ul className="space-y-4 mb-8">
                {features.map((feature: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-primary mr-3">✦</span>
                    <span className="text-lg">{feature}</span>
                  </li>
                ))}
              </ul>
              <Link href="/palm-reading">
                <Button className="mystical-button">
                  Upload Your Palm Image
                </Button>
              </Link>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative aspect-square max-w-md mx-auto rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.pexels.com/photos/7658355/pexels-photo-7658355.jpeg"
                  alt="Palm reading"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Palm Preview Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-card/50 z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Live Palm Preview</h2>
              <p className="text-xl text-muted-foreground mb-6">
                Use your webcam for real-time palm line tracking and instant palmistry feedback.
              </p>
              <Link href="/live-palmer">
                <Button className="mystical-button">
                  Start Live Preview
                </Button>
              </Link>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative aspect-square max-w-md mx-auto rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.pexels.com/photos/7658357/pexels-photo-7658357.jpeg"
                  alt="Live Palm Preview"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Astrology Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-card/50 z-0"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Get a Detailed Understanding</h2>
              <p className="text-xl text-muted-foreground mb-6">
                Combine palmistry with astrological predictions to unlock deeper life insights.
              </p>
              <Link href="/get-astrology">
                <Button className="mystical-button">
                  Generate Astrology Report
                </Button>
              </Link>
            </div>

            <div className="order-1 md:order-2">
              <div className="relative aspect-square max-w-md mx-auto rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.pexels.com/photos/7290290/pexels-photo-7290290.jpeg"
                  alt="Astrology Chart"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Learn the Art of Palmistry</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the meanings behind the lines, mounts, and shapes found in hands.
              Unlock the wisdom of this ancient practice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {learnTopics.map(
              (topic: { icon: string; title: string; description: string }, index: number) => (
                <div key={index} className="mystical-card text-center">
                  <div className="text-4xl text-primary mb-4">{topic.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{topic.title}</h3>
                  <p className="text-muted-foreground text-lg">{topic.description}</p>
                </div>
              )
            )}
          </div>

          <div className="text-center mt-12">
            <Link href="/learn">
              <Button className="mystical-button">
                Explore Learning Resources
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
