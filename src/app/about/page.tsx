import { Metadata } from 'next'
import { Card, CardContent } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about Festive Store and our mission to bring joy to your celebrations.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 flex-1 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">About Festive Store</h1>
        <p className="text-xl text-muted-foreground">Bringing the light and joy of festivals straight to your home.</p>
      </div>

      <div className="space-y-8">
        <Card>
          <CardContent className="p-8">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At Festive Store, we believe that every celebration deserves the finest, most authentic decorations and gifts. Our mission is to preserve traditional craftsmanship while providing a modern, seamless shopping experience.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We work directly with local artisans across India to source premium quality diyas, lanterns, and festive decor, ensuring that their incredible art reaches homes nationwide.
            </p>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Quality First</h2>
              <p className="text-muted-foreground leading-relaxed">
                Every product in our catalog undergoes rigorous quality checks. We do not compromise on the materials used, ensuring that your festive moments are safe, beautiful, and long-lasting.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-4">Customer Support</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our dedicated support team is available around the clock during peak festive seasons to ensure your orders arrive on time and exactly as expected. Your happiness is our top priority.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
