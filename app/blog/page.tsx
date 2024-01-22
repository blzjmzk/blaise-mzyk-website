import Link from "next/link";
import Header from "../_components/header";
import prisma from "@/prisma/client";

const Blog = async () => {
  const posts = await prisma.post.findMany();

  return (
    <>
      <Header>Blog</Header>
      <div>
        {posts.map((post) => (
          <Link
            className="link-clear-black"
            key={post.id}
            href={`/blog/${post.slug}`}
          >
            <div className="postContainer">
              <h4>{post.title}</h4>
              <div className="flex">
                <p>Published: {post.publishedAt.toDateString()}</p>
                <p>Category: {post.category}</p>
              </div>
              <p>{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Blog;
