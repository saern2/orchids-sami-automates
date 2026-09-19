import { notFound } from "next/navigation";
import { getProjectById } from "@/lib/admin-data";
import ProjectForm from "../project-form";

export const dynamic = "force-dynamic";

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!uuid.test(id)) notFound();
  const project = await getProjectById(id);
  if (!project) notFound();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black">{project.title}</h1>
        <p className="text-sm text-[#A1A1AA] mt-1">Editing project</p>
      </div>
      <ProjectForm project={project} />
    </div>
  );
}
