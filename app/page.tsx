import React from "react";
import photo_of_blaise_mzyk from "../public/images/photo_of_blazej_mzyk.jpg";
import Image from "next/image";
import styles from "./homePage.module.css";
import Link from "next/link";

const HomePage = () => {
  return (
    <>
      <div className={styles.hero}>
        <div className={styles.heroBlockOne}>
          <div className={styles.heroImage}>
            <Image
              src={photo_of_blaise_mzyk}
              alt="Photo of Blaise Mzyk"
              fill
              // sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
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
          <div className={styles.heroTagline}>
            I am a{" "}
            <Link href="/philosophy" className={styles.customLink}>
              philosopher
            </Link>{" "}
            (finishing my PhD) and a{" "}
            <Link href="/programming" className={styles.customLink}>
              programmer
            </Link>{" "}
            based in Kraków, Poland. Here you can find more information about
            me, as well as my{" "}
            <Link href="/book-notes" className={styles.customLink}>
              book notes
            </Link>
            . I also encourage you to check out my blog.
          </div>
          <button className={`${styles.btnHero} btn btn-primary`}>
            <Link href="/blog" className="link-clear">
              See My blog
            </Link>
          </button>
        </div>
      </div>
      <p className="copyright">© Copyright 2024 – Błażej Mzyk</p>
    </>
  );
};

export default HomePage;
