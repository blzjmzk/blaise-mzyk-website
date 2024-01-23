"use client";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { postSchema } from "@/app/validationSchemas";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

type PostFormData = z.infer<typeof postSchema>;

const PostForm = () => {
  const router = useRouter();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
  });

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      await axios.post("/api/posts", data);
      router.push("/blaise");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label id="title">Title</label>
        <input id="title" type="text" {...register("title")} />
      </div>
      <div className="form-group">
        <label id="slug">Slug</label>
        <input id="slug" type="text" {...register("slug")} />
      </div>
      <div className="form-group">
        <label id="category">Category</label>
        <input id="category" type="text" {...register("category")} />
      </div>
      <div className="form-group">
        <label id="description">Description</label>
        <textarea
          name="description"
          id="description"
          {...register("description")}
        ></textarea>
      </div>
      <div>
        <Controller
          name="content"
          control={control}
          render={({ field }) => <SimpleMDE placeholder="content" {...field} />}
        />
      </div>

      <button type="submit">Submit New Post</button>
    </form>
  );
};

export default PostForm;
