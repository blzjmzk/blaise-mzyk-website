import Header from "@/components/header";
import SectionHeading from "@/components/section-heading";
import prisma from "@/prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./BookNotePage.module.css";

interface Props {
  params: { slug: string };
}

const fetchPost = cache((bookNoteSlug: string) =>
  prisma.bookNote.findUnique({ where: { slug: bookNoteSlug } })
);

const BookNotePage = async ({ params }: Props) => {
  const bookNote = await fetchPost(params.slug);

  if (!bookNote) return notFound();

  return (
    <>
      <Header>
        {bookNote.title} by {bookNote.author} ({bookNote.year})
      </Header>
      <section className={styles.bookNoteContainer}>
        <div className={styles.bookTagline}>
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
          <p className="bookDescription">{bookNote.description}</p>
        </div>
        <section>
          <SectionHeading>Highlights</SectionHeading>
          <ReactMarkdown>{bookNote.highlights}</ReactMarkdown>
        </section>
        <section>
          <SectionHeading>Thoughts</SectionHeading>
          <ReactMarkdown>{bookNote.thoughts}</ReactMarkdown>
        </section>
      </section>
    </>
  );
};

export async function generateMetadata({ params }: Props) {
  const bookNote = await fetchPost(params.slug);
  return {
    title: "Book Notes | " + bookNote?.title,
    description: `Book Note of ${bookNote?.title} by ${bookNote?.author}`,
  };
}

export default BookNotePage;
