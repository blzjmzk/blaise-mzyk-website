import prisma from "@/prisma/client";
import { Metadata } from "next";
import Link from "next/link";
import Button from "../../_components/button";
import formatDate from "../../_services/FormatDate";
import styles from "./BookNotesPage.module.css";
import DeleteBookNoteButton from "../_components/delete-book-note-button/DeleteBookNoteButton";

const BookNotePage = async () => {
  const bookNotes = await prisma.bookNote.findMany({
    orderBy: { publishedAt: "desc" },
  });

  return (
    <div>
      <Button variant="primary">
        <Link href="/blaise/book-notes/new-book-note" className="link-clear">
          Add New Book Note
        </Link>
      </Button>
      <table className={styles.Table}>
        <thead>
          <tr>
            <th className={styles.TableData}>Id</th>
            <th className={styles.TableData}>Title</th>
            <th className={styles.TableData}>Author</th>
            <th className={styles.TableData}>Year</th>
            <th className={styles.TableData}>Publishing Time</th>
            <th className={styles.TableData}>Edit</th>
            <th className={styles.TableData}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {bookNotes.map((bookNote) => (
            <tr key={bookNote.id}>
              <td className={styles.TableData}>{bookNote.id}</td>
              <td className={styles.TableData}>{bookNote.title}</td>
              <td className={styles.TableData}>{bookNote.author}</td>
              <td className={styles.TableData}>{bookNote.year}</td>
              <td className={styles.TableData}>
                {formatDate(bookNote.publishedAt.toDateString())}
              </td>
              <td className={styles.TableData}>
                <Button variant="primary">
                  <Link
                    className="link-clear"
                    href={`/blaise/book-notes/edit/${bookNote.slug}`}
                  >
                    Edit
                  </Link>
                </Button>
              </td>
              <td className={styles.TableData}>
                <DeleteBookNoteButton bookNoteSlug={bookNote.slug} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const metadata: Metadata = {
  title: "Blaise Mzyk | Admin Panel - Book Notes",
  description: "Blaise Mzyk admin panel - editing book notes",
};

export default BookNotePage;
