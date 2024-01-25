import Link from "next/link";
import Header from "../_components/header";
import prisma from "@/prisma/client";
import styles from "./BlogPage.module.css";
import formatDate from "../_services/FormatDate";

const BlogPage = async () => {
  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: "desc" },
  });

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
            <div className={styles.postContainer}>
              <h2 className={styles.postTitle}>{post.title}</h2>
              <div className="flex">
                <p>Published: {formatDate(post.publishedAt.toDateString())}</p>
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

export default BlogPage;
