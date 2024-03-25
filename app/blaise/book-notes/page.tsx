import prisma from "@/prisma/client";
import { Metadata } from "next";
import Link from "next/link";
import Button from "../../../components/button";
import formatDate from "../../../services/FormatDate";
import styles from "./BookNotesPage.module.css";
import DeleteBookNoteButton from "../components/delete-book-note-button/DeleteBookNoteButton";

const BookNotePage = async () => {
  const bookNotes = await prisma.bookNote.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div className={styles.BookNotesPage}>
      <h2>Book Notes</h2>
      <Button variant="primary" width="25rem">
        <Link href="/blaise/book-notes/new-book-note" className="link-clear">
          Add New Book Note
        </Link>
      </Button>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={[styles.tableData, styles.tableDesktop].join(" ")}>
              Id
            </th>
            <th className={styles.tableData}>Title</th>
            <th className={[styles.tableData, styles.tableDesktop].join(" ")}>
              Author
            </th>
            <th className={[styles.tableData, styles.tableDesktop].join(" ")}>
              Year
            </th>
            <th className={styles.tableData}>Publishing Time</th>
            <th className={styles.tableData}>Edit</th>
            <th className={styles.tableData}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {bookNotes.map((bookNote) => (
            <tr key={bookNote.id}>
              <td className={[styles.tableData, styles.tableDesktop].join(" ")}>
                {bookNote.id}
              </td>
              <td className={styles.tableData}>{bookNote.title}</td>
              <td className={[styles.tableData, styles.tableDesktop].join(" ")}>
                {bookNote.author}
              </td>
              <td className={[styles.tableData, styles.tableDesktop].join(" ")}>
                {bookNote.year}
              </td>
              <td className={styles.tableData}>
                {formatDate(bookNote.publishedAt.toDateString())}
              </td>
              <td className={styles.tableData}>
                <Button variant="primary">
                  <Link
                    className="link-clear"
                    href={`/blaise/book-notes/edit/${bookNote.slug}`}
                  >
                    Edit
                  </Link>
                </Button>
              </td>
              <td className={styles.tableData}>
                <DeleteBookNoteButton bookNoteSlug={bookNote.slug} />
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
  title: "Blaise Mzyk | Admin Panel - Book Notes",
  description: "Blaise Mzyk admin panel - editing book notes",
};

export default BookNotePage;
