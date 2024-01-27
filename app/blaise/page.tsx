import prisma from "@/prisma/client";
import axios from "axios";
import { Metadata } from "next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import formatDate from "../_services/FormatDate";
import styles from "./PostsPage.module.css";
import DeletePostButton from "./_components/delete-post-button/DeletePostButton";

const PostsPage = async () => {
  const posts = await prisma.post.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div>
      <button>
        <Link href="/blaise/new-post">Add New Post</Link>
      </button>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th className={styles.TableData}>Id</th>
            <th className={styles.TableData}>Title</th>
            <th className={styles.TableData}>Category</th>
            <th className={styles.TableData}>Publishing Time</th>
            <th className={styles.TableData}>Updated Time</th>
            <th className={styles.TableData}>Edit</th>
            <th className={styles.TableData}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td className={styles.TableData}>{post.id}</td>
              <td className={styles.TableData}>{post.title}</td>
              <td className={styles.TableData}>{post.category}</td>
              <td className={styles.TableData}>
                {formatDate(post.publishedAt.toDateString())}
              </td>
              <td className={styles.TableData}>
                {formatDate(post.updatedAt?.toDateString())}
              </td>
              <td className={styles.TableData}>
                <button>
                  <Link href={`/blaise/edit/${post.slug}`}>Edit</Link>
                </button>
              </td>
              <td className={styles.TableData}>
                <DeletePostButton postSlug={post.slug} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const metadata: Metadata = {
  title: "Blaise Mzyk | Admin Panel",
  description: "Blaise Mzyk admin panel ",
};

export default PostsPage;
