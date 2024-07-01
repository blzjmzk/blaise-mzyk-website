import prisma from "@/prisma/client";
import { Metadata } from "next";
import Link from "next/link";
import Button from "../../components/button";
import formatDate from "../../services/FormatDate";
import styles from "./PostsPage.module.css";
import DeletePostButton from "./components/delete-post-button/DeletePostButton";

const PostsPage = async () => {
  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className={styles.PostsPage}>
      <h2>Posts</h2>
      <Link href="/blaise/new-post">
        <Button variant="primary" width="25rem">
          Add New Post
        </Button>
      </Link>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={[styles.tableData, styles.tableDesktop].join(" ")}>
              Id
            </th>
            <th className={styles.tableData}>Title</th>
            <th className={[styles.tableData, styles.tableDesktop].join(" ")}>
              Category
            </th>
            <th className={styles.tableData}>Publishing Time</th>
            <th className={[styles.tableData, styles.tableDesktop].join(" ")}>
              Updated Time
            </th>
            <th className={styles.tableData}>Edit</th>
            <th className={styles.tableData}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className={[styles.tableData, styles.tableDesktop].join(" ")}>
                {post.id}
              </td>
              <td className={styles.tableData}>{post.title}</td>
              <td className={[styles.tableData, styles.tableDesktop].join(" ")}>
                {post.category}
              </td>
              <td className={styles.tableData}>
                {formatDate(post.publishedAt.toDateString())}
              </td>
              <td className={[styles.tableData, styles.tableDesktop].join(" ")}>
                {post.updatedAt.toISOString() === post.publishedAt.toISOString()
                  ? ""
                  : formatDate(post.updatedAt.toDateString())}
              </td>
              <td className={styles.tableData}>
                <Link href={`/blaise/edit/${post.slug}`}>
                  <Button variant="primary">Edit</Button>
                </Link>
              </td>
              <td className={styles.tableData}>
                <DeletePostButton postSlug={post.slug} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blaise Mzyk | Admin Panel",
  description: "Blaise Mzyk admin panel ",
};

export default PostsPage;
