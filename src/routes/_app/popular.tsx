import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/popular')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/popular"!</div>
}
