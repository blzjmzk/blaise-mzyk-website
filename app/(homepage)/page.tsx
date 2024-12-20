import Image from "next/image";
import Link from "next/link";
import photo_of_blaise_mzyk from "../../public/images/photo_of_blazej_mzyk.jpg";
import styles from "@/app/css/HomePage.module.css";
import { Metadata } from "next";
import Button from "../../components/button";

const HomePage = () => {
  return (
    <>
      <header className={styles.hero}>
        <div className={styles.heroBlockOne}>
          <div className={styles.heroImage}>
            <Image
              src={photo_of_blaise_mzyk}
              alt="Photo of Blaise Mzyk"
              fill
              priority
              sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
              style={{
                objectFit: "cover",
                borderRadius: "var(--border-radius)",
              }}
              quality={100}
            />
          </div>
          <div className={styles.heroBanner}>
            Hey,
            <br /> I&apos;m Blaise
          </div>
        </div>
        <div className={styles.heroBlockTwo}>
          <p className={styles.heroTagline}>
            I am a{" "}
            <Link
              href="/philosophy"
              className={`${styles.customLink} ${styles.noWrap}`}
            >
              philosopher
            </Link>{" "}
            based in Kraków, Poland. Here you can find more information about
            me, as well as my{" "}
            <Link
              href="/book-notes"
              className={`${styles.customLink} ${styles.noWrap}`}
            >
              book notes
            </Link>
            . I also encourage you to check out my blog.
          </p>
          <Link href="/blog">
            <Button variant={"primary"} width="32rem">
              Read My Blog
            </Button>
          </Link>
        </div>
      </header>
    </>
  );
};

export const metadata: Metadata = {
  title: "Blaise Mzyk",
  description:
    "Personal website and blog of Błażej Mzyk - philosopher and sofware engineer. Here you can find more information about me, as well as my book notes and posts.",
};

export default HomePage;
