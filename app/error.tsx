"use client";
import Button from "@/components/button";
import Link from "next/link";
import React from "react";
import styles from "@/app/css/ErrorPage.module.css";

const NotFound = () => {
  return (
    <>
      <div className={styles.container}>
        <h1>Oh No! An Error Occurred</h1>
        <p>Looks like something went wrong.</p>
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
