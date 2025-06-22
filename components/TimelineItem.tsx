interface TimelineItemProps {
  year: string
  title: string
  description: string
  isLeft?: boolean
}

const TimelineItem = ({
  year,
  title,
  description,
  isLeft = true
}: TimelineItemProps) => {
  return (
    <div className="relative pb-12">
      {/* Vertical line */}
      <div className="absolute left-1/2 -ml-px h-full w-0.5 bg-border"></div>
      
      {/* Timeline content */}
      <div className="relative flex items-start">
        <div className={`flex ${isLeft ? 'justify-end' : 'justify-start'} w-1/2 ${isLeft ? 'pr-8' : 'pl-8'}`}>
          <div className={`max-w-md ${isLeft ? 'text-right' : 'text-left'}`}>
            <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-2">
              {year}
            </span>
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground text-lg">{description}</p>
          </div>
        </div>
        
        <div className="absolute left-1/2 -ml-3 mt-1.5 w-6 h-6 rounded-full border-4 border-primary bg-background"></div>
        
        <div className={`w-1/2 ${isLeft ? 'pl-8' : 'pr-8'}`}></div>
      </div>
    </div>
  )
}

export default TimelineItem