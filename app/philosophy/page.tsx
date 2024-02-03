import React from "react";
import Header from "../_components/header";
import SectionHeading from "../_components/section-heading";
import { Metadata } from "next";
import prisma from "@/prisma/client";
import styles from "./PhilosophyPage.module.css";
import Link from "next/link";

const PhilosophyPage = async () => {
  const publications = await prisma?.publication.findMany({
    orderBy: { year: "desc" },
  });

  const talks = await prisma?.talk.findMany({
    orderBy: { year: "desc" },
  });

  return (
    <>
      <Header>Philosophy</Header>
      <SectionHeading>My Publications</SectionHeading>
      <div className={styles.publicationsContainer}>
        <div className={styles.publicationsTagline}>
          I publish under the name &quot;Błażej Mzyk&quot;, which is the Polish
          form of my first and last name. Clicking on the title of a publication
          will take you to a page where you can download it in open access (if
          available).
        </div>
        <ul className={styles.publicationsList}>
          <li className={styles.listItem}>
            {`Mzyk, B. Non-Maximalism Reconsidered: Truthmaking and the Dependence
          of Truths on Being. `}
            <span className={styles.italic}>Filozofia Nauki</span>
            {`. Forthcoming`}
          </li>
          {publications.map((publication) => {
            if (publication.type === "paper") {
              return (
                <li key={publication.id} className={styles.listItem}>
                  {`Mzyk, B. (${publication.year}). `}
                  <Link
                    href={publication.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.customLink}
                  >
                    {publication.title}
                  </Link>{" "}
                  <span className={styles.italic}>
                    {publication.journalName}
                  </span>
                  {`, ${publication.journalIssue}. `}
                  {publication.doiLink && `${publication.doiLink}`}
                  {publication.language === "polish" && ` [in Polish]`}
                </li>
              );
            } else {
              return (
                <li key={publication.id} className={styles.listItem}>
                  {`Mzyk, B. (${publication.year}). `}
                  <Link
                    href={publication.link || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.customLink}
                  >
                    {publication.title}
                  </Link>
                  {`. In ${publication.bookEditors} (Eds.), `}
                  <span className={styles.italic}>{publication.bookName}</span>
                  {` (pp.${publication.bookPages}). ${publication.bookPublisher}.`}
                  {publication.language === "polish" && ` [in Polish]`}
                </li>
              );
            }
          })}
        </ul>
      </div>
      <SectionHeading>My Talks</SectionHeading>
      <ul className={styles.talksList}>
        {talks.map((talk) => (
          <li key={talk.id} className={styles.listItem}>
            {`${talk.title}, `}
            <span className={styles.italic}>{talk.conference}</span>
            {`, ${talk.details}, ${talk.year}`}
            {talk.isOnline && ` [online]`}
          </li>
        ))}
      </ul>
      <SectionHeading>See Also My Profiles at:</SectionHeading>
    </>
  );
};
export const metadata: Metadata = {
  title: "Blaise Mzyk | Philosophy",
  description: "Blaise Mzyk philosophy page ",
};

export default PhilosophyPage;
