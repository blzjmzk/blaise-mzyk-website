import React from "react";
import PostForm from "../../components/posts-form/PostForm";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

const EditPostPage = async ({ params }: Props) => {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) notFound();

  return <PostForm post={post} />;
};

export default EditPostPage;
