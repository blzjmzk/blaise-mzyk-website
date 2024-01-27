import prisma from "@/prisma/client";
import { Metadata } from "next";
import Link from "next/link";
import Header from "../_components/header";
import formatDate from "../_services/FormatDate";
import styles from "./BlogPage.module.css";

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
              <div className={styles.postPropertiesContainer}>
                <div>
                  <span className={styles.postProperties}>Published:</span>{" "}
                  <span className={styles.postPublishedValue}>
                    {formatDate(post.publishedAt.toDateString())}
                  </span>
                </div>
                <div>
                  <span className={styles.postProperties}>Category:</span>{" "}
                  <span className={styles.postPublishedValue}>
                    {post.category}
                  </span>
                </div>
              </div>
              <p>{post.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export const metadata: Metadata = {
  title: "Blaise Mzyk | Blog",
  description: "Blaise Mzyk blog page ",
};

export default BlogPage;
