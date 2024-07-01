import Skeleton from "@/components/Skeleton";
import styles from "../BlogPage.module.css";

const PostsListSkeleton = () => {
  const skeletons = [1, 2, 3, 4, 5, 6];

  return (
    <div className={styles.postsListSkeleton}>
      {skeletons.map((skeleton) => (
        <div key={skeleton}>
          <Skeleton height={200} borderRadius={8} />
        </div>
      ))}
    </div>
  );
};

export default PostsListSkeleton;
