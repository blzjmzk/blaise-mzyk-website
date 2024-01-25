"use client";
import { postSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Post } from "@prisma/client";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { transliterate } from "transliteration";
import { z } from "zod";
import styles from "./PostForm.module.css";
import { SyncLoader } from "react-spinners";

type PostFormData = z.infer<typeof postSchema>;

const PostForm = ({ post }: { post?: Post }) => {
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
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });
  const title = watch("title");

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (post) await axios.patch("/api/posts/" + post.slug, data);
      else await axios.post("/api/posts", data);
      router.push("/blaise");
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
  }, [title]);

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          id="title"
          type="text"
          defaultValue={post?.title}
          placeholder="Add Post Title..."
          {...register("title")}
        />
        {errors.title && <p>{errors.title?.message}</p>}
        <input
          id="slug"
          type="text"
          value={autoGeneratedSlug}
          {...register("slug")}
          placeholder={post?.slug ? post.slug : "Post Slug..."}
          readOnly
        />
        {errors.slug && <p>{errors.slug?.message}</p>}
        <input
          id="category"
          defaultValue={post?.category}
          type="text"
          {...register("category")}
          placeholder="Add Post Category..."
        />
        {errors.category && <p>{errors.category?.message}</p>}
        <textarea
          id="description"
          rows={8}
          defaultValue={post?.description}
          placeholder="Add Post Description..."
          {...register("description")}
        />
        {errors.description && <p>{errors.description?.message}</p>}
        <div>
          <Controller
            name="content"
            control={control}
            defaultValue={post?.content}
            render={({ field }) => (
              <SimpleMDE placeholder="Add Post Content..." {...field} />
            )}
          />
        </div>
        {errors.content && <p>{errors.content?.message}</p>}

        <button disabled={isSubmitting} type="submit">
          <div className="flex">
            {post ? "Update Post" : "Submit New Post"}
            {isSubmitting && (
              <SyncLoader color="#f7f7f7" size={8} speedMultiplier={0.7} />
            )}
          </div>
        </button>
      </form>
    </div>
  );
};

export default PostForm;