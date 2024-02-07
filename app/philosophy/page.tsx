import prisma from "@/prisma/client";
import {
  NumberCircleOne,
  NumberCircleThree,
  NumberCircleTwo,
} from "@phosphor-icons/react/dist/ssr"; //Licence: MIT
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import logo_google_scholar from "../../public/images/logo-google-scholar.png";
import logo_philpeople from "../../public/images/logo-philpeople.svg";
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
      <section className={styles.philosophyTagline}>
        <div className={styles.philosophyTaglineItem}>
          <div>
            <NumberCircleOne
              size={60}
              weight="bold"
              color="var(--color-primary)"
            />
          </div>
          <p>
            I am currently a <span className={styles.bold}>researcher</span> at
            the Jagiellonian University in Kraków, Poland, where{" "}
            <span className={styles.bold}>I manage the project</span>{" "}
            &quot;Truthmaking. Are Facts Still Really Indispensable?&quot;
            (Funding: Ministry of Education and Science of the Republic of
            Poland, Program: Diamentowy Grant IX Edition 2020-2024, Budget:
            approx. 180K PLN/42K USD, Role: Principal Investigator)
          </p>
        </div>
        <div className={styles.philosophyTaglineItem}>
          <div>
            <NumberCircleTwo
              size={60}
              weight="bold"
              color="var(--color-primary)"
            />
          </div>
          <p>
            I am also a <span className={styles.bold}>doctoral student</span> at
            the Jagiellonian University Doctoral School in the Humanities. I am
            working on a <span className={styles.bold}>PhD thesis</span> about
            the criticism of David Armstrong&apos;s standard theory of
            truthmaking over the past 20 years.
          </p>
        </div>
        <div className={styles.philosophyTaglineItem}>
          <div>
            <NumberCircleThree
              size={60}
              weight="bold"
              color="var(--color-primary)"
            />
          </div>
          <p>
            My <span className={styles.bold}>area of specialization</span> is
            contemporary analytic philosophy in the field of metaphysics. My
            research focuses on the{" "}
            <span className={styles.bold}>theory of truthmaking</span> (with a
            particular emphasis on the relation between the substantive and
            deflationary approaches to truthmaking) and the{" "}
            <span className={styles.bold}>concept of fact</span>.
          </p>
        </div>
      </section>
      <section className={styles.sectionContainer}>
        <SectionHeading>My Publications</SectionHeading>
        <div className={styles.publicationsTagline}>
          I publish under the name &quot;Błażej Mzyk&quot;, which is the Polish
          form of my first and last name. Clicking on the title of a publication
          will take you to a page where you can download it in open access (if
          available).
        </div>
        <ul>
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
      </section>
      <section className={styles.sectionContainer}>
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
      </section>
      <section className={styles.sectionContainer}>
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
          <Button variant="primary" width="37.2rem">
            See My Full Academic CV
          </Button>
        </Link>
      </section>
    </>
  );
};
export const metadata: Metadata = {
  title: "Blaise Mzyk | Philosophy",
  description: "Blaise Mzyk philosophy page ",
};

export default PhilosophyPage;
