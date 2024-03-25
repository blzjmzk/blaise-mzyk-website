"use client";
import Button from "@/components/button";
import { bookNoteSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookNote } from "@prisma/client";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { SyncLoader } from "react-spinners";
import { transliterate } from "transliteration";
import { z } from "zod";
import styles from "./BookNotesForm.module.css";

type BookNoteFormData = z.infer<typeof bookNoteSchema>;

const BookNotesForm = ({ bookNote }: { bookNote?: BookNote }) => {
  const router = useRouter();

  const [autoGeneratedSlug, setAutoGeneratedSlug] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BookNoteFormData>({
    resolver: zodResolver(bookNoteSchema),
  });
  const title = watch("title");

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (bookNote) await axios.patch("/api/book-notes/" + bookNote.slug, data);
      else await axios.post("/api/book-notes", data);
      router.push("/blaise/book-notes");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  useEffect(() => {
    const transformedSlug = title
      ? transliterate(title).toLowerCase().replace(/\s+/g, "-")
      : "";
    setAutoGeneratedSlug(transformedSlug);
  }, [title, onSubmit]);

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          id="title"
          className={styles.formInput}
          type="text"
          defaultValue={bookNote?.title}
          placeholder="Add title..."
          autoFocus
          {...register("title")}
        />
        {errors.title && <p>{errors.title?.message}</p>}
        <input
          id="slug"
          className={styles.formInput}
          type="text"
          value={bookNote?.slug ? bookNote.slug : autoGeneratedSlug}
          {...register("slug")}
          placeholder={bookNote?.slug ? bookNote.slug : "Book note slug"}
          readOnly
        />
        {errors.slug && <p>{errors.slug?.message}</p>}
        <input
          id="author"
          className={styles.formInput}
          type="text"
          defaultValue={bookNote?.author}
          placeholder="Add book author..."
          {...register("author")}
        />
        {errors.author && <p>{errors.author?.message}</p>}
        <input
          id="year"
          className={styles.formInput}
          type="text"
          defaultValue={bookNote?.year}
          placeholder="Add book publish year..."
          {...register("year")}
        />
        {errors.year && <p>{errors.year?.message}</p>}
        <input
          id="cover"
          className={styles.formInput}
          type="text"
          defaultValue={bookNote?.cover}
          placeholder="Add link to the book cover..."
          {...register("cover")}
        />
        {errors.cover && <p>{errors.cover?.message}</p>}
        <textarea
          id="description"
          className={styles.formInput}
          rows={8}
          defaultValue={bookNote?.description}
          placeholder="Add book short description..."
          {...register("description")}
        />
        {errors.description && <p>{errors.description?.message}</p>}
        <div>
          <Controller
            name="highlights"
            control={control}
            defaultValue={bookNote?.highlights}
            render={({ field }) => (
              <SimpleMDE placeholder="Add book highlights..." {...field} />
            )}
          />
        </div>
        {errors.highlights && <p>{errors.highlights?.message}</p>}
        <div>
          <Controller
            name="thoughts"
            control={control}
            defaultValue={bookNote?.thoughts}
            render={({ field }) => (
              <SimpleMDE
                placeholder="Add thoughts you've found in the book..."
                {...field}
              />
            )}
          />
        </div>
        {errors.highlights && <p>{errors.thoughts?.message}</p>}
        <Button variant="primary" disabled={isSubmitting} type="submit">
          <div className={styles.flexButton}>
            {bookNote ? "Update BookNote" : "Submit New Book Note"}
            {isSubmitting && (
              <SyncLoader color="#f7f7f7" size={7} speedMultiplier={0.7} />
            )}
          </div>
        </Button>
      </form>
    </div>
  );
};

export default BookNotesForm;
