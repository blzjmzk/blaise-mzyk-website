import Button from "@/components/button";
import Link from "next/link";
import React from "react";
import styles from "@/app/css/NotFound.module.css";

const NotFound = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>Oops! Page Not Found</h1>
        <p>It looks like the page you were looking for doesn’t exist.</p>
        <Link href="/" className={styles.link}>
          <Button variant={"primary"} width="32rem">
            Go To Homepage
          </Button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
