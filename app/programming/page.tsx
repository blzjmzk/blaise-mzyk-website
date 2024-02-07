import prisma from "@/prisma/client";
import { Metadata } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Button from "../_components/button";
import Header from "../_components/header";
import styles from "./ProgrammingPage.module.css";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr"; //Licence MIT
import Link from "next/link";

const ProgrammingPage = async () => {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });
  return (
    <>
      <Header>Programming</Header>
      <section className={styles.projectsTagline}>
        <p>
          I became interested in programming in high school, where I was
          familiarized with HTML and C++ since my class had a math and computer
          science extended program. Years later I returned to this interest,
          focusing on Javascript and web design (including HTML/CSS and also
          Figma, Webflow and Framer). The site you are currently viewing was
          design (Figma) and made from scratch in Next.js 14 & TypeScript. Below
          you can see my other projects
        </p>
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
                alt={`Cover photo of ${project.title}`}
                fill
                style={{
                  objectFit: "contain",
                  objectPosition: "top",
                  borderRadius: "var(--border-radius)",
                }}
              />
            </div>
            <div className={styles.projectDetails}>
              <h2 className={styles.projectTitle}>{project.title}</h2>
              <div className={styles.projectDescription}>
                <ReactMarkdown>{project.description}</ReactMarkdown>
              </div>
              <div className={styles.projectFeatures}>
                <ReactMarkdown>{project.features}</ReactMarkdown>
              </div>
              <div className={styles.projectDetailsButtons}>
                <Button variant="outline" width="18rem">
                  See Code
                </Button>
                <Button variant="primary" width="18rem">
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
