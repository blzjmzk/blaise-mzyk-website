import prisma from "@/prisma/client";
import { notFound } from "next/navigation";
import ProjectForm from "../../../_components/projects-form";

interface Props {
  params: { id: string };
}

const EditProjectPage = async ({ params }: Props) => {
  const project = await prisma.project.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!project) notFound();

  return (
    <div>
      <h2>Edit {project.title} project</h2>
      <ProjectForm project={project} />
    </div>
  );
};

export default EditProjectPage;
