import prisma from "@/prisma/client";
import { Metadata } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Button from "../../components/button";
import Header from "../../components/header";
import styles from "./ProgrammingPage.module.css";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr"; //Licence MIT
import Link from "next/link";
import SectionHeading from "../../components/section-heading";

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
            I became interested in programming in high school, where I had
            experience with <span className="bold">C++</span> and HTML because
            my class had an extended math and computer science program. I
            returned to this interest during my PhD studies. I started learning{" "}
            <span className="bold">Python</span>, then moved on to other
            technologies.
          </p>
          <p>
            I focus on frontend development (
            <span className="bold">
              HTML/CSS, JavaScript, TypeScript, React, Next.js
            </span>
            ). I also have skills in backend (
            <span className="bold">
              Prisma ORM, Node.js, Spring Boot, building API in Next.js,
            </span>
            ), databases (<span className="bold">SQL, MongoDB</span>) and
            graphic design (<span className="bold">Figma</span>
            ).
          </p>
          <p>
            <span className="bold">I also contribute to a startup</span> by
            working on an application that conducts surveys among employees to
            increase the productivity of teams.
          </p>
          <p>
            <span className="bold">
              The site you are currently viewing was designed (Figma) and built
              by me from scratch in Next.js 14
            </span>
            .
          </p>
          <p>Below you can see details about some of my projects:</p>
        </div>
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
                {project.type === "mywebsite" && (
                  <>
                    <Link
                      href={project.designLink!}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" width="100%">
                        See Design in Figma
                      </Button>
                    </Link>
                    <Link
                      href={project.codeLink!}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="primary" width="100%">
                        See Code
                      </Button>
                    </Link>
                  </>
                )}
                {project.type === "app" && (
                  <>
                    <Link
                      href={project.codeLink!}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" width="100%">
                        See Code
                      </Button>
                    </Link>
                    <Link
                      href={project.liveLink!}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="primary" width="100%">
                        See Live
                      </Button>
                    </Link>
                  </>
                )}
                {project.type === "website" && (
                  <Link
                    href={project.designLink!}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="primary" width="100%">
                      See Design in Figma
                    </Button>
                  </Link>
                )}
                {project.type === "backend" && (
                  <Link
                    href={project.codeLink!}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="primary" width="100%">
                      See Code
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className={styles.seeMore}>
        <Link
          href="https://github.com/blzjmzk"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="primary" width="100%">
            <div className={styles.projectsTaglineButton}>
              See more projects on my GitHub
              <GithubLogo size={29} color="var(--color-white)" />
            </div>
          </Button>
        </Link>
      </section>
    </>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blaise Mzyk | Programming",
  description: "Blaise Mzyk programming page ",
};

export default ProgrammingPage;
