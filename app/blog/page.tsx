import Header from "../_components/header";
import prisma from "@/prisma/client";

const Blog = async () => {
  const posts = await prisma.post.findMany();

  return (
    <>
      <Header>Blog</Header>
      <div>
        {posts.map((post) => (
          <div key={post.id} className="postContainer">
            <h4>{post.title}</h4>
            <div className="flex">
              <p>{post.publishedAt.toDateString()}</p>
              <p>{post.category}</p>
            </div>
            <p>{post.description}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Blog;
