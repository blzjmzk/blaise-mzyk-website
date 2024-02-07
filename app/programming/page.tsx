import prisma from "@/prisma/client";
import { Metadata } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Button from "../_components/button";
import Header from "../_components/header";
import styles from "./ProgrammingPage.module.css";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr"; //Licence MIT
import Link from "next/link";
import SectionHeading from "../_components/section-heading";

const ProgrammingPage = async () => {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });
  return (
    <>
      <Header>Programming</Header>
      <section className={styles.projectsTagline}>
        <div>
          <p>
            I became interested in programming in high school, where I was
            acquainted with <span className="bold">C++</span> and HTML because
            my class had an extended math and computer science program. I
            returned to this interest during my PhD studies. I started learning{" "}
            <span className="bold">Python</span>, then moved on to other
            technologies.
          </p>
          <p>
            I specialize in frontend development (
            <span className="bold">
              Next.js, React, TypeScript, JavaScript, HTML/CSS
            </span>
            ). I also have a background in backend (
            <span className="bold">
              Prisma, Express.js, building API in Next.js
            </span>
            ), databases (<span className="bold">MySQL, PostgreSQL</span>) and
            graphic design (<span className="bold">Figma</span>
            ). The site you are currently viewing was designed (Figma) and built
            by me from scratch in Next.js 14. Below you can see some of my other
            projects
          </p>
        </div>
        <Link
          href="https://github.com/blzjmzk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="primary">
            <div className={styles.projectsTaglineButton}>
              See my GitHub Profile
              <GithubLogo size={35} color="var(--color-white)" />
            </div>
          </Button>
        </Link>
      </section>
      <section className={styles.projectsContainer}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectContainer}>
            <div className={styles.projectImage}>
              <Image
                src={project.image}
                alt={`Screenshot of the ${project.title} project.`}
                fill
                style={{
                  objectFit: "cover",
                  objectPosition: "top",
                  borderRadius: "var(--border-radius)",
                }}
              />
            </div>
            <div className={styles.projectDetails}>
              <SectionHeading>{project.title}</SectionHeading>
              <div className={styles.projectDescription}>
                <ReactMarkdown>{project.description}</ReactMarkdown>
              </div>
              <div className={styles.projectFeatures}>
                <ReactMarkdown>{project.features}</ReactMarkdown>
              </div>
              <div className={styles.projectDetailsButtons}>
                <Button variant="outline" width="20rem">
                  See Code
                </Button>
                <Button variant="primary" width="20rem">
                  See Live
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

export const metadata: Metadata = {
  title: "Blaise Mzyk | Programming",
  description: "Blaise Mzyk programming page ",
};

export default ProgrammingPage;
