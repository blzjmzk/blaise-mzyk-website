import { Metadata } from "next";
import Header from "../_components/header";
import prisma from "@/prisma/client";
import Image from "next/image";
import styles from "./ProgrammingPage.module.css";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import Button from "../_components/button";

const ProgrammingPage = async () => {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });
  return (
    <>
      <Header>Programming</Header>
      <div className={styles.projectsContainer}>
        {projects.map((project) => (
          <div key={project.id} className={styles.projectContainer}>
            <div className={styles.projectImage}>
              <Image
                src={project.image}
                alt={`Cover photo of ${project.title}`}
                fill
                sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                style={{
                  objectFit: "cover",
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
                <Button variant="outline">See Code</Button>
                <Button variant="primary">See Live</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export const metadata: Metadata = {
  title: "Blaise Mzyk | Programming",
  description: "Blaise Mzyk programming page ",
};

export default ProgrammingPage;
