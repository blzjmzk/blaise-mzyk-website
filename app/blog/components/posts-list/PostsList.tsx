import CategoryBadge from "@/components/category-badge";
import formatDate from "@/services/FormatDate";
import { Post } from "@prisma/client";
import Link from "next/link";
import styles from "../../BlogPage.module.css";

interface Props {
  posts: Post[];
}

const PostsList = ({ posts }: Props) => {
  return (
    <div className={styles.postsList}>
      {posts.map((post) => (
        <Link
          className="link-clear-black"
          key={post.id}
          href={`/blog/${post.slug}`}
        >
          <div className={styles.postContainer}>
            <h2 className={styles.postTitle}>{post.title}</h2>
            <div className={styles.postPropertiesContainer}>
              <div className={styles.propertiesContainer}>
                <span className={styles.postProperties}>Published:</span>{" "}
                <span className={styles.postPublishedValue}>
                  {formatDate(post.publishedAt.toDateString())}
                </span>
              </div>
              <div className={styles.propertiesContainer}>
                <span className={styles.postProperties}>Category:</span>{" "}
                <CategoryBadge categoryName={post.category}>
                  {post.category}
                </CategoryBadge>
              </div>
            </div>
            <p>{post.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PostsList;
