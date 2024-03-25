import { Metadata } from "next";
import prisma from "@/prisma/client";
import styles from "./BookNotesPage.module.css";
import Header from "../components/header";
import Link from "next/link";
import Image from "next/image";

const BookNotesPage = async () => {
  const bookNotes = await prisma.bookNote.findMany({
    orderBy: { publishedAt: "desc" },
  });
  return (
    <>
      <Header>My Book Notes</Header>
      <h3 className={styles.booksTagline}>
        Below you will find my notes from the books (which I read in Polish
        translation):
      </h3>
      <section className={styles.booksContainer}>
        {bookNotes.map((bookNote) => (
          <Link
            className="link-clear-black"
            key={bookNote.id}
            href={`/book-notes/${bookNote.slug}`}
          >
            <div className={styles.bookNoteContainer}>
              <div className={styles.bookCover}>
                <Image
                  src={bookNote.cover}
                  alt={`Cover photo of ${bookNote.title}`}
                  fill
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                  style={{
                    objectFit: "cover",
                    borderRadius: "var(--border-radius)",
                  }}
                />
              </div>
              <div className={styles.bookDetails}>
                <p
                  className={[
                    styles.bookDetailsValue,
                    styles.bookDetailsValueTitle,
                  ].join(" ")}
                >
                  {bookNote.title}
                </p>
                <p className={styles.bookDetailsValue}>by {bookNote.author}</p>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
};

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blaise Mzyk | Book Notes",
  description: "Blaise Mzyk book notes page ",
};

export default BookNotesPage;
