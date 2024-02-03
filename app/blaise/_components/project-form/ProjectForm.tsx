"use client";
import Button from "@/app/_components/button";
import { projectSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Project } from "@prisma/client";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { SyncLoader } from "react-spinners";
import { z } from "zod";
import styles from "./ProjectForm.module.css";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type ProjectFormData = z.infer<typeof projectSchema>;

const ProjectForm = ({ project }: { project?: Project }) => {
  const router = useRouter();

  const [error, setError] = useState("");
  const [isSubmitting, setSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true);
      if (project) await axios.patch("/api/projects/" + project.id, data);
      else await axios.post("/api/projects", data);
      router.push("/blaise/projects");
      router.refresh();
    } catch (error) {
      setSubmitting(false);
      setError("An unexpected error occurred.");
    }
  });

  return (
    <div>
      {error && <div>{error}</div>}
      <form onSubmit={onSubmit} className={styles.form}>
        <input
          id="title"
          className={styles.formInput}
          type="text"
          defaultValue={project?.title}
          placeholder="Add title..."
          autoFocus
          {...register("title")}
        />
        {errors.title && <p>{errors.title?.message}</p>}
        <input
          id="order"
          className={styles.formInput}
          type="text"
          defaultValue={project?.order}
          placeholder="Add project order..."
          {...register("order")}
        />
        {errors.order && <p>{errors.order?.message}</p>}
        <input
          id="type"
          className={styles.formInput}
          defaultValue={project?.type}
          type="text"
          {...register("type")}
          placeholder="Add project type..."
        />
        {errors.type && <p>{errors.type?.message}</p>}
        <input
          id="image"
          className={styles.formInput}
          defaultValue={project?.image}
          type="text"
          {...register("image")}
          placeholder="Add project image..."
        />
        {errors.type && <p>{errors.type?.message}</p>}
        <input
          id="designLink"
          className={styles.formInput}
          defaultValue={project?.designLink || ""}
          type="text"
          {...register("designLink")}
          placeholder="Add project design link..."
        />
        {errors.designLink && <p>{errors.designLink?.message}</p>}
        <input
          id="codeLink"
          className={styles.formInput}
          defaultValue={project?.codeLink || ""}
          type="text"
          {...register("codeLink")}
          placeholder="Add project code link..."
        />
        {errors.codeLink && <p>{errors.codeLink?.message}</p>}
        <input
          id="liveLink"
          className={styles.formInput}
          defaultValue={project?.liveLink || ""}
          type="text"
          {...register("liveLink")}
          placeholder="Add project live link..."
        />
        {errors.liveLink && <p>{errors.liveLink?.message}</p>}
        <div>
          <Controller
            name="description"
            control={control}
            defaultValue={project?.description}
            render={({ field }) => (
              <SimpleMDE placeholder="Add description..." {...field} />
            )}
          />
        </div>
        {errors.description && <p>{errors.description?.message}</p>}
        <div>
          <Controller
            name="features"
            control={control}
            defaultValue={project?.features}
            render={({ field }) => (
              <SimpleMDE placeholder="Add features..." {...field} />
            )}
          />
        </div>
        {errors.features && <p>{errors.features?.message}</p>}

        <Button variant="primary" disabled={isSubmitting} type="submit">
          <div className={styles.flexButton}>
            {project ? "Update Project" : "Submit New Project"}
            {isSubmitting && (
              <SyncLoader color="#f7f7f7" size={7} speedMultiplier={0.7} />
            )}
          </div>
        </Button>
      </form>
    </div>
  );
};

export default ProjectForm;
