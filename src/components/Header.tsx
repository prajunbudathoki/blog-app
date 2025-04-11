import { Link } from '@tanstack/react-router'
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="p-4 flex items-center bg-white text-black shadow-md">
      <div className="flex items-center gap-4">
        <div className="text-xl font-bold">Logo</div>
        <nav className="flex gap-6">
          <Link to="/" className="text-gray-700 hover:text-black [&.active]:underline" >
            Home
          </Link>
          <Link to="/popular" className="text-gray-700 hover:text-black [&.active]:underline">
            Popular
          </Link>
          <Link to="/trending" className="text-gray-700 hover:text-black [&.active]:underline">
            Trending
          </Link>
          {/* <Link to="/create" className="text-gray-700 hover:text-black [&.active]:underline">
            Create
          </Link> */}
        </nav>
      </div>
      <div className="ml-auto">
        <Button variant="outline" className="px-4 cursor-pointer">
          Login
        </Button>
      </div>
    </header>
  )
}