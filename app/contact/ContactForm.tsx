"use client";
import Button from "@/app/_components/button";
import { contactFormSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "@prisma/client";
import "easymde/dist/easymde.min.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { SyncLoader } from "react-spinners";
import { z } from "zod";
import styles from "./ContactForm.module.css";

type ContactFormData = z.infer<typeof contactFormSchema>;

const ContactForm = ({ post }: { post?: Post }) => {
  const [error, setError] = useState("");

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  return (
    <div>
      {error && <div>{error}</div>}
      <form className={styles.form}>
        <div className={styles.formFlex}>
          <input
            id="name"
            className={styles.formInput}
            type="text"
            placeholder="Your name..."
            autoFocus
            {...register("name")}
          />
          {errors.name && <p>{errors.name?.message}</p>}
          <input
            id="email"
            className={styles.formInput}
            type="email"
            {...register("email")}
            placeholder="Add email..."
          />
          {errors.email && <p>{errors.email?.message}</p>}
        </div>
        <textarea
          id="message"
          className={styles.formInput}
          rows={8}
          placeholder="Add message..."
          {...register("message")}
        />
        {errors.message && <p>{errors.message?.message}</p>}

        <Button variant="primary" type="submit">
          <div className={styles.flexButton}>Send Email</div>
        </Button>
      </form>
    </div>
  );
};

export default ContactForm;
