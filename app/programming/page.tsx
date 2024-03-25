import prisma from "@/prisma/client";
import { Metadata } from "next";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import Button from "../components/button";
import Header from "../components/header";
import styles from "./ProgrammingPage.module.css";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr"; //Licence MIT
import Link from "next/link";
import SectionHeading from "../components/section-heading";

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
            ), databases (<span className="bold">MySQL, MongoDB</span>) and
            graphic design (<span className="bold">Figma</span>
            ). I have also worked on projects using{" "}
            <span className="bold">TailwindCSS</span> and various UI libraries (
            <span className="bold">
              Radix UI, Shadcn UI, daisyUI, Chakra UI
            </span>
            ). I also contribute to a friend&apos;s startup by helping build the
            frontend of the project&apos;s app.
          </p>
          <p>
            The site you are currently viewing was designed (Figma) and built by
            me from scratch in Next.js 14. Below you can see details about some
            of my projects
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
              <GithubLogo size={29} color="var(--color-white)" />
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
                    <Button variant="outline" width="100%">
                      See Design in Figma
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
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
