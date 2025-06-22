import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LearnCardProps {
  title: string
  description: string
  href: string
  image: string
  index: number
  className?: string
}

const LearnCard = ({
  title,
  description,
  href,
  image,
  index,
  className
}: LearnCardProps) => {
  return (
    <Link 
      href={href}
      className={cn(
        "mystical-card block group transition-all duration-300 hover:-translate-y-1",
        className
      )}
    >
      <div className="relative w-full aspect-[4/3] mb-4 rounded-lg overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-3 left-3 bg-primary/90 text-primary-foreground w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold">
          {index + 1}
        </div>
      </div>
      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-muted-foreground text-lg line-clamp-3">
        {description}
      </p>
    </Link>
  )
}

export default LearnCard