import Link from "next/link";
import Header from "../_components/header";
import prisma from "@/prisma/client";
import styles from "./BlogPage.module.css";

const BlogPage = async () => {
  const posts = await prisma.post.findMany();

  return (
    <>
      <Header>Blog</Header>
      <div className={styles.postsList}>
        {posts.map((post) => (
          <Link
            className="link-clear-black"
            key={post.id}
            href={`/blog/${post.slug}`}
          >
            <div className={styles.postAnimate}>
              <div className={styles.postContainer}>
                <h2 className={styles.postTitle}>{post.title}</h2>
                <div className="flex">
                  <p>Published: {post.publishedAt.toDateString()}</p>
                  <p>Category: {post.category}</p>
                </div>
                <p>{post.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default BlogPage;
