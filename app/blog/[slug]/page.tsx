import Header from "@/components/header";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { cache, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./PostPage.module.css";
import Link from "next/link";
import Button from "@/components/button";

interface Props {
  params: { slug: string };
}

const fetchPost = cache((postSlug: string) =>
  prisma.post.findUnique({ where: { slug: postSlug } })
);

const PostPage = async ({ params }: Props) => {
  const post = await fetchPost(params.slug);

  if (!post) return notFound();

  return (
    <>
      <Header>{post.title}</Header>
      <div className={styles.postContainer}>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
      <Link href="/blog">
        <div className={styles.postButton}>
          <Button variant="primary" width="100%">
            See Other Posts
          </Button>
        </div>
      </Link>
    </>
  );
};

export async function generateMetadata({ params }: Props) {
  const post = await fetchPost(params.slug);
  return {
    title: "Blog | " + post?.title,
    description: post?.description,
  };
}

export default PostPage;
