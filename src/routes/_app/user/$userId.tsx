import { createFileRoute } from "@tanstack/react-router";
import ProfileCard from "@/components/UserProfile";

export const Route = createFileRoute("/_app/user/$userId")({
  component: UserProfilePage,
});

function UserProfilePage() {
  const { userId } = Route.useParams();

  return (
    <div className="py-6">
      <ProfileCard userId={parseInt(userId)} />
    </div>
  );
}
