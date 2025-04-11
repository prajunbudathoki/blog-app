import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/trending')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/trending"!</div>
}
