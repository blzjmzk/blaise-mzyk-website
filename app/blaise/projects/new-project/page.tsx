import dynamic from "next/dynamic";

const ProjectForm = dynamic(
  () => import("@/app/blaise/components/projects-form/ProjectForm"),
  {
    ssr: false,
  }
);

const NewProjectPage = () => {
  return (
    <div>
      <h2>Add New Project</h2>
      <ProjectForm />
    </div>
  );
};

export default NewProjectPage;
