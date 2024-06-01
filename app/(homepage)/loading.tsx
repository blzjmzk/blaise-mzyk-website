import Skeleton from "@/components/Skeleton";
import Image from "next/image";
import Link from "next/link";
import photo_of_blaise_mzyk from "../../public/images/photo_of_blazej_mzyk.jpg";
import styles from "@/app/css/HomePage.module.css";
import { Metadata } from "next";
import Button from "../../components/button";

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
