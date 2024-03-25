import dynamic from "next/dynamic";

const PostForm = dynamic(
  () => import("@/app/blaise/components/posts-form/PostForm"),
  {
    ssr: false,
  }
);

const NewPostPage = () => {
  return (
    <div>
      <h2>Add New Post</h2>
      <PostForm />
    </div>
  );
};

export default NewPostPage;
