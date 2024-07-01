import styles from "@/app/css/HomePage.module.css";
import Skeleton from "@/components/Skeleton";

const LoadingHomePage = () => {
  return (
    <>
      <header className={styles.hero}>
        <div className={styles.heroBlockOne}>
          <Skeleton className={styles.heroImage} />
          <Skeleton className={styles.heroBannerSkeleton} />
        </div>
        <div className={styles.heroBlockTwo}>
          <div className={styles.skeleton}>
            <Skeleton
              className={styles.heroTaglineSkeleton}
              count={6}
              width={320}
            />
          </div>
          <Skeleton style={{ marginTop: "2rem", height: "4rem" }} />
        </div>
      </header>
    </>
  );
};

export default LoadingHomePage;
