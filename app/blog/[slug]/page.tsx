import Header from "@/app/_components/header";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Props {
  params: { slug: string };
}

const PostPage = async ({ params }: Props) => {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });

  if (!post) return notFound();

  return (
    <div>
      <Header>{post.title}</Header>
      <div>
        <ReactMarkdown>{post.content}</ReactMarkdown>
      </div>
    </div>
  );
};

export async function generateMetadata({ params }: Props) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug },
  });
  return {
    title: "Blog | " + post?.title,
    description: post?.description,
  };
}

export default PostPage;
