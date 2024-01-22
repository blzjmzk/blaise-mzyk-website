import Header from "@/app/_components/header";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

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
      <div>{post.content}</div>
    </div>
  );
};

export default PostPage;
