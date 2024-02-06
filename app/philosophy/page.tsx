import prisma from "@/prisma/client";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logo_google_scholar from "../../public/images/logo-google-scholar.png";
import logo_philpeople from "../../public/images/logo-philpeople.png";
import Button from "../_components/button";
import Header from "../_components/header";
import SectionHeading from "../_components/section-heading";
import styles from "./PhilosophyPage.module.css";

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
                  {publication.link ? (
                    <Link
                      href={publication.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.customLink}
                    >
                      {publication.title}
                    </Link>
                  ) : (
                    <span>{publication.title}</span>
                  )}{" "}
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
                  {publication.link ? (
                    <Link
                      href={publication.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.customLink}
                    >
                      {publication.title}
                    </Link>
                  ) : (
                    <span>{publication.title}</span>
                  )}
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
      <div className={styles.profilesContainer}>
        <Link
          href={"https://philpeople.org/profiles/blazej-mzyk"}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.philpeopleImage}
        >
          <Image
            src={logo_philpeople}
            alt="PhilPeople logo"
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
            style={{
              objectFit: "cover",
            }}
          />
        </Link>
        <Link
          href="https://scholar.google.com/citations?user=PF86w3oAAAAJ&hl="
          target="_blank"
          rel="noopener noreferrer"
          className={styles.googleScholarImage}
        >
          <Image
            src={logo_google_scholar}
            alt="Google Scholar logo"
            fill
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
            style={{
              objectFit: "cover",
            }}
          />
        </Link>
      </div>
      <Link
        href="https://philpeople.org/public_cache/file?content_type=application%2Fpdf&key=4ubyqbhxg36iu2t52wq6rbojac3b"
        className={styles.cvButton}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button variant="primary" width="80%">
          See My Full Academic CV
        </Button>
      </Link>
    </>
  );
};
export const metadata: Metadata = {
  title: "Blaise Mzyk | Philosophy",
  description: "Blaise Mzyk philosophy page ",
};

export default PhilosophyPage;
