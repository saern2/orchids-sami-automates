import ProjectForm from "../project-form";

export const dynamic = "force-dynamic";

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-black">New project</h1>
      <ProjectForm project={null} />
    </div>
  );
}
