import Header from "@/app/_components/header";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { cache, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./PostPage.module.css";

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
