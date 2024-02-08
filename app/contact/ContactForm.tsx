"use client";
import Button from "@/app/_components/button";
import { contactFormSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SyncLoader } from "react-spinners";
import { z } from "zod";
import styles from "./ContactForm.module.css";
import toast, { Toaster } from "react-hot-toast";

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactForm = () => {
  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/contact", data);
      setSubmitting(false);
      toast.success("Email successfully sent!", {
        style: {
          border: "2px solid var(--color-secondary)",
          marginTop: "8rem",
          padding: "1.2rem 3rem",
          width: "36rem",
        },
        duration: 5000,
      });
      reset();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <div>
      <h2 className={styles.heading}>You can send me a message here:</h2>
      {error && toast.error(error)}
      <form onSubmit={onSubmit} className={styles.form}>
        <div className={styles.formFlex}>
          <div className={styles.inputFlex}>
            <input
              id="name"
              className={styles.formInput}
              type="text"
              placeholder="Your name..."
              autoFocus
              autoComplete="name"
              {...register("name")}
            />
            {errors.name && (
              <div className={styles.error}>{errors.name?.message}</div>
            )}
          </div>
          <div className={styles.inputFlex}>
            <input
              id="email"
              autoComplete="email"
              className={styles.formInput}
              type="email"
              {...register("email")}
              placeholder="Your email adress..."
            />
            {errors.email && (
              <div className={styles.error}>{errors.email?.message}</div>
            )}
          </div>
        </div>
        <input
          id="subject"
          className={styles.formInput}
          type="text"
          {...register("subject")}
          placeholder="Email's subject..."
        />
        {errors.email && (
          <div className={styles.error}>{errors.subject?.message}</div>
        )}
        <textarea
          id="message"
          className={styles.formInput}
          rows={16}
          placeholder="Your message..."
          {...register("message")}
        />
        {errors.message && (
          <div className={styles.error}>{errors.message?.message}</div>
        )}

        <Button variant="primary" disabled={isSubmitting} type="submit">
          <div className={styles.flexButton}>
            Send
            {isSubmitting && (
              <SyncLoader color="#f7f7f7" size={7} speedMultiplier={0.7} />
            )}
          </div>
        </Button>
      </form>
      <Toaster />
    </div>
  );
};

export default ContactForm;
