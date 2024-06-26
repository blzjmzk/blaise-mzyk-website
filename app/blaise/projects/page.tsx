import prisma from "@/prisma/client";
import { Metadata } from "next";
import Link from "next/link";
import Button from "../../../components/button";
import formatDate from "../../../services/FormatDate";
import styles from "./ProjectsPage.module.css";
import DeleteBookNoteButton from "../components/delete-book-note-button/DeleteBookNoteButton";
import DeleteProjectButton from "../components/delete-project-button/DeleteProjectButton";

const ProjectsPage = async () => {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className={styles.BookNotesPage}>
      <h2>Projects</h2>
      <Link href="/blaise/projects/new-project">
        <Button variant="primary" width="25rem">
          Add New Project
        </Button>
      </Link>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.tableData}>Order</th>
            <th className={styles.tableData}>Title</th>
            <th className={[styles.tableData, styles.tableDesktop].join(" ")}>
              Id
            </th>
            <th className={styles.tableData}>Type</th>
            <th className={[styles.tableData, styles.tableDesktop].join(" ")}>
              Publishing Time
            </th>
            <th className={styles.tableData}>Edit</th>
            <th className={styles.tableData}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project.id}>
              <td className={styles.tableData}>{project.order}</td>
              <td className={styles.tableData}>{project.title}</td>
              <td className={[styles.tableData, styles.tableDesktop].join(" ")}>
                {project.id}
              </td>
              <td className={styles.tableData}>{project.type}</td>
              <td className={[styles.tableData, styles.tableDesktop].join(" ")}>
                {formatDate(project.publishedAt.toDateString())}
              </td>
              <td className={styles.tableData}>
                <Link href={`/blaise/projects/edit/${project.id}`}>
                  <Button variant="primary">Edit</Button>
                </Link>
              </td>
              <td className={styles.tableData}>
                <DeleteProjectButton projectId={project.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blaise Mzyk | Admin Panel - Projects",
  description: "Blaise Mzyk admin panel - editing projects",
};

export default ProjectsPage;
