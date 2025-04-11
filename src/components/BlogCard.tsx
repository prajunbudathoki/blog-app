
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

interface Blog {
  id: number;
  title: string;
  body: string;
}

export default function BlogCard() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const url =
    "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch(url);
      const data = await res.json();
      setBlogs(data.slice(0, 9));
    };
    fetchBlogs();
  }, []);
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
      {blogs.map((blog) => (
        <Card key={blog.id} className="w-[350px]">
          <img
            src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeizyn8SwFNfeJdYexfcqyurpCe47SKVR0Ew&s`}
            alt={`blog`}
            className="w-full h-[150px] object-cover"
          />
          <CardHeader>
            <CardTitle>{blog.title}</CardTitle>
            <CardDescription>
              {blog.body.slice(0, 100)}
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-between">
            <Link to={`/blog/${blog.id}`}>
              <Button variant="outline">
                Read More
              </Button>
            </Link>
            <Button variant="default">
              Share
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
