import React from "react";
import BookNotesForm from "../../../_components/book-notes-form/";
import prisma from "@/prisma/client";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

const EditBookNotePage = async ({ params }: Props) => {
  const bookNote = await prisma.bookNote.findUnique({
    where: { slug: params.slug },
  });

  if (!bookNote) notFound();

  return (
    <div>
      <h3>Edit {bookNote.title} book note</h3>
      <BookNotesForm bookNote={bookNote} />
    </div>
  );
};

export default EditBookNotePage;
