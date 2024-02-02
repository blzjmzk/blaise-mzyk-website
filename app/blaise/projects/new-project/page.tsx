import dynamic from "next/dynamic";

const ProjectForm = dynamic(
  () => import("@/app/blaise/_components/project-form/ProjectForm"),
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
