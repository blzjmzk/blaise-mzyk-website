import Header from "@/app/_components/header";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import { cache } from "react";
import ReactMarkdown from "react-markdown";
import styles from "./BookNotePage.module.css";
import SectionHeading from "@/app/_components/section-heading";

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
        <p>{bookNote.description}</p>
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
