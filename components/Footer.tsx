import Link from 'next/link'
import { Instagram, Facebook, Twitter } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-border/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">Palmistry Insights</h3>
            <p className="text-muted-foreground text-lg">
              Discover what your hands reveal about your past, present, and future.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-foreground/70 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">Quick Links</h3>
            <ul className="space-y-2 text-lg">
              <li>
                <Link href="/palm-reading" className="text-foreground/70 hover:text-primary transition-colors">
                  Palm Reading
                </Link>
              </li>
              <li>
                <Link href="/palm-diagram" className="text-foreground/70 hover:text-primary transition-colors">
                  Palm Diagram
                </Link>
              </li>
              <li>
                <Link href="/learn" className="text-foreground/70 hover:text-primary transition-colors">
                  Learn Palmistry
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-foreground/70 hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-foreground/70 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-primary">Newsletter</h3>
            <p className="text-muted-foreground text-lg">
              Subscribe to receive insights and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 rounded-l-md bg-muted border border-border/50 text-foreground focus:outline-none focus:ring-1 focus:ring-primary w-full"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-r-md hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border/40 text-center">
          <p className="text-muted-foreground text-base">
            © {new Date().getFullYear()} Palmistry Insights. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer