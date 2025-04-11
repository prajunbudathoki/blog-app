import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Skeleton } from "./ui/skeleton";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Post {
  id: number;
  body: string;
  title: string;
}

export default function ProfileCard({
  userId,
}: {
  userId: number;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPost] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUserPosts() {
      const [userResult, postsResult] =
        await Promise.all([
          axios.get(
            `https://jsonplaceholder.typicode.com/users/${userId}`
          ),
          axios.get(
            `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
          ),
        ]);
      setUser(userResult.data);
      setPost(postsResult.data);
    }
    fetchUserPosts();
  }, [userId]);

  if (loading) {
    return (
      <div className="p-4 max-w-xl mx-auto border rounded-xl shadow-sm">
        <div className="flex items-center gap-4 mb-4">
          <Skeleton className="w-16 h-16 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="w-40 h-4" />
            <Skeleton className="w-28 h-3" />
          </div>
        </div>
        <Skeleton className="w-full h-6 mb-2" />
        <Skeleton className="w-full h-4 mb-1" />
        <Skeleton className="w-5/6 h-4 mb-1" />
      </div>
    );
  }
  return (
    <div className="p-4 max-w-xl mx-auto border rounded-xl shadow-lg">
      <div className="flex items-center gap-4 mb-4">
        <Avatar>
          <AvatarImage
            src={`https://github.com/shadcn.png`}
            alt={''}
          />
          <AvatarFallback>
            {user?.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">
            {user?.name}
          </h2>
          <p className="text-sm text-gray-500">
            {user?.email}
          </p>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-bold mb-2">
          {`Posts made by (${user?.name})`}
        </h3>
        <ul className="space-y-2">
          {posts.map((post) => (
            <div
              key={post.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow transition mb-4"
            >
              <Link
                to="/blog/$blogId"
                params={{
                  blogId: post.id.toString(),
                }}
                className="text-xl font-bold mb-2 text-blue-600 hover:underline block"
              >
                {post.title}
              </Link>
              <p className="text-gray-700 line-clamp-2">
                {post.body}
              </p>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}
