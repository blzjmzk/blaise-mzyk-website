"use client";
import Button from "@/app/_components/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteBookNoteButton = ({ bookNoteSlug }: { bookNoteSlug: string }) => {
  const router = useRouter();
  const [error, setError] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteBookNote = async () => {
    try {
      setIsDeleting(true);
      await axios.delete("/api/book-notes/" + bookNoteSlug);
      router.push("/blaise/book-notes");
      router.refresh(); //przeciwdziałamy cachingowi
    } catch (error) {
      setIsDeleting(false);
      setError(true);
    }
  };
  return (
    <Button variant="delete" onClick={deleteBookNote}>
      Delete
    </Button>
  );
};

export default DeleteBookNoteButton;
