import prisma from "@/prisma/client";
import { Metadata } from "next";
import Link from "next/link";
import Button from "../_components/button";
import formatDate from "../_services/FormatDate";
import styles from "./PostsPage.module.css";
import DeletePostButton from "./_components/delete-post-button/DeletePostButton";

const PostsPage = async () => {
  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className={styles.PostsPage}>
      <h2>Posts</h2>
      <Button variant="primary" width="25rem">
        <Link href="/blaise/new-post" className="link-clear">
          Add New Post
        </Link>
      </Button>
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
                <Button variant="primary">
                  <Link
                    className="link-clear"
                    href={`/blaise/edit/${post.slug}`}
                  >
                    Edit
                  </Link>
                </Button>
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
