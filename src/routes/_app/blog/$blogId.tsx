import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  Await,
  createFileRoute,
  Link,
} from "@tanstack/react-router";
import axios from "axios";

async function getBlog(id: string) {
  await new Promise((resolve) =>
    setTimeout(resolve, 2000)
  );
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  const blog = res.data;
  const userResponse = await axios.get(
    `https://jsonplaceholder.typicode.com/users/${blog.userId}`
  );
  blog.user = userResponse.data;
  return blog;
}

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
}

async function getComments(id: string) {
  await new Promise((resolve) =>
    setTimeout(resolve, 4000)
  );
  const res = await axios.get<Comment[]>(
    `https://jsonplaceholder.typicode.com/comments?postId=${id}`
  );
  return res.data;
}

export const Route = createFileRoute(
  "/_app/blog/$blogId"
)({
  loader: ({ params }) => {
    let res = getBlog(params.blogId);
    let comments = getComments(params.blogId);
    return {
      data: res,
      comments: comments,
    };
  },
  component: BlogDetails,
});

function BlogDetails() {
  const { data, comments } =
    Route.useLoaderData();

  return (
    <div className="max-w-3xl mx-auto p-6">
      <Await
        promise={data}
        fallback={
          <div className="max-w-3xl mx-auto p-6">
            <Skeleton className="w-full h-60 mb-4" />
            <Skeleton className="w-full h-4 mb-1" />
            <Skeleton className="w-60 h-4" />
          </div>
        }
      >
        {(blog: any) => {
          return (
            <div>
              <img
                src={`https://picsum.photos/seed/${blog.id}/800/300`}
                alt="banner"
                className="rounded mb-6"
              />
              <h1 className="text-3xl font-bold mb-4">
                {blog.title}
              </h1>
              <p className="text-gray-700 leading-7">
                {blog.body}
              </p>
              <div className="flex gap-2 items-center mt-4">
                <Avatar>
                  <AvatarImage
                    src={`https://github.com/shadcn.png`}
                    alt={blog.user.name}
                  />
                  <AvatarFallback>
                    {blog.user.name.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <Link
                  to="/user/$userId"
                  params={{
                    userId:
                      blog.user.id.toString(),
                  }}
                  className="font-bold text-blue-600 hover:underline"
                >
                  {blog.user.name}
                </Link>
              </div>
              <div className="mt-6">
                <strong>Leave a Comment</strong>
                <Textarea placeholder="Type your message here." />
                <Button
                  className="mt-2"
                  variant={"outline"}
                >
                  Submit
                </Button>
              </div>
            </div>
          );
        }}
      </Await>
      <h2 className="text-2xl font-bold mb-4 mt-8">
        Comments
      </h2>
      <Await
        promise={comments}
        fallback={
          <div>
            {Array.from({ length: 6 }).map(
              (_, idx) => (
                <div
                  key={idx}
                  className="border-b border-gray-200 pb-4 mb-4"
                >
                  <div className="flex gap-2 mb-2">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="space-y-1">
                      <Skeleton className="w-100 h-4" />
                      <Skeleton className="w-60 h-3" />
                    </div>
                  </div>
                  <Skeleton className="w-full h-3 mb-1" />
                  <Skeleton className="w-30 h-3" />
                </div>
              )
            )}
            <Skeleton />
          </div>
        }
      >
        {(comments) => (
          <div>
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="border-b border-gray-200 pb-4 mb-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar>
                      <AvatarFallback>
                        {comment.name
                          .charAt(0)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold">
                        {comment.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {comment.email}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700">
                    {comment.body}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">
                No comments yet.
              </p>
            )}
          </div>
        )}
      </Await>
    </div>
  );
}
