import BlogPosts from '@/components/BlogPosts'
import Hero from '@/components/Hero'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/')({
  component: App,
})

function App() {
  return (
    <div>
      <Hero />
      <BlogPosts />
    </div>
  )
}
