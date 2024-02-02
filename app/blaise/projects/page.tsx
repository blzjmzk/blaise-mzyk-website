import prisma from "@/prisma/client";
import { Metadata } from "next";
import Link from "next/link";
import Button from "../../_components/button";
import formatDate from "../../_services/FormatDate";
import styles from "./ProjectsPage.module.css";
import DeleteBookNoteButton from "../_components/delete-book-note-button/DeleteBookNoteButton";
import DeleteProjectButton from "../_components/delete-project-button/DeleteProjectButton";

const ProjectsPage = async () => {
  const projects = await prisma.project.findMany({
    orderBy: { order: "asc" },
  });

  return (
    <div className={styles.BookNotesPage}>
      <h2>Projects</h2>
      <Button variant="primary" width="25rem">
        <Link href="/blaise/projects/new-project" className="link-clear">
          Add New Project
        </Link>
      </Button>
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
                <Button variant="primary">
                  <Link
                    className="link-clear"
                    href={`/blaise/projects/edit/${project.id}`}
                  >
                    Edit
                  </Link>
                </Button>
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

export const metadata: Metadata = {
  title: "Blaise Mzyk | Admin Panel - Projects",
  description: "Blaise Mzyk admin panel - editing projects",
};

export default ProjectsPage;
