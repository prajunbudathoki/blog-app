import { Button } from "@/components/ui/button"
export default function Hero() {
  return (
    <div className="text-center py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Our Blog
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover insightful articles, trending topics, and the latest updates in the world of blogging.
        </p>
        <Button variant="outline" className="px-6 py-3 text-lg cursor-pointer">
          Get Started
        </Button>
      </div>
    </div>
  )
}