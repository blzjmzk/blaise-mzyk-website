import prisma from "@/prisma/client";
import { Post } from "@prisma/client";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Header from "../../components/header";
import styles from "./BlogPage.module.css";
import CategoryFilter from "./components/category-filter";
import PostsListSkeleton from "./loading/PostsListSkeleton";

const PostsList = dynamic(
  () => import("@/app/blog/components/posts-list/PostsList"),
  {
    ssr: false,
    loading: () => <PostsListSkeleton />,
  }
);

const BlogPage = async ({
  searchParams,
}: {
  searchParams: { category?: string };
}) => {
  const categoryFilter = searchParams.category;
  const posts: Post[] = await prisma.post.findMany({
    where:
      categoryFilter && categoryFilter !== "All Posts"
        ? { category: categoryFilter }
        : {},
    orderBy: { publishedAt: "desc" },
  });

  return (
    <>
      <Header>Blog</Header>
      <div className={styles.categoryFilter}>
        <CategoryFilter />
      </div>
      <PostsList posts={posts} />
    </>
  );
};

// export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blaise Mzyk | Blog",
  description: "Blaise Mzyk blog page ",
};

export default BlogPage;
