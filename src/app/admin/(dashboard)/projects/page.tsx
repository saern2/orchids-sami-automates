import Link from "next/link";
import { Plus } from "lucide-react";
import { listProjects } from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ProjectRowActions from "./row-actions";

export const dynamic = "force-dynamic";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", { dateStyle: "medium", timeStyle: "short" });
}

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [projects, { saved }] = await Promise.all([listProjects(), searchParams]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Projects</h1>
          <p className="text-sm text-[#A1A1AA] mt-1">
            {projects.length} total · {projects.filter((p) => p.published).length} published ·{" "}
            {projects.filter((p) => p.published && p.featured).length} on the home page
          </p>
        </div>
        <Button asChild className="font-bold">
          <Link href="/admin/projects/new">
            <Plus size={16} /> New project
          </Link>
        </Button>
      </div>

      {saved && (
        <p role="status" className="text-sm font-bold text-emerald-300 bg-emerald-400/10 border border-emerald-400/20 rounded-xl px-4 py-3">
          Saved. The public page has been refreshed.
        </p>
      )}

      <div className="rounded-2xl border border-white/10 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-white/10 hover:bg-transparent">
              <TableHead className="text-[#A1A1AA]">Title</TableHead>
              <TableHead className="text-[#A1A1AA]">Client</TableHead>
              <TableHead className="text-[#A1A1AA]">Category</TableHead>
              <TableHead className="text-[#A1A1AA]">Published</TableHead>
              <TableHead className="text-[#A1A1AA]">Featured</TableHead>
              <TableHead className="text-[#A1A1AA] text-right">Order</TableHead>
              <TableHead className="text-[#A1A1AA]">Updated</TableHead>
              <TableHead className="text-[#A1A1AA] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.length === 0 && (
              <TableRow className="border-white/10">
                <TableCell colSpan={8} className="text-center text-[#A1A1AA] py-10">
                  No projects yet.
                </TableCell>
              </TableRow>
            )}
            {projects.map((p, i) => (
              <TableRow key={p.id} className="border-white/10">
                <TableCell className="font-bold">
                  <Link href={`/admin/projects/${p.id}`} className="hover:text-purple-400">
                    {p.title}
                  </Link>
                  <div className="text-[11px] text-[#A1A1AA] font-normal">{p.slug}</div>
                </TableCell>
                <TableCell className="text-white/80">
                  {p.client_name ?? <span className="text-[#A1A1AA]">—</span>}
                  {p.client_name && !p.client_public && (
                    <span className="ml-2 text-[10px] uppercase tracking-widest text-[#A1A1AA]">private</span>
                  )}
                </TableCell>
                <TableCell className="text-white/80">{p.category}</TableCell>
                <TableCell>{p.published ? <Dot on /> : <Dot />}</TableCell>
                <TableCell>{p.featured ? <Dot on /> : <Dot />}</TableCell>
                <TableCell className="text-right tabular-nums">{p.sort_order}</TableCell>
                <TableCell className="text-[#A1A1AA] whitespace-nowrap">{formatDate(p.updated_at)}</TableCell>
                <TableCell className="text-right">
                  <ProjectRowActions project={p} isFirst={i === 0} isLast={i === projects.length - 1} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

function Dot({ on = false }: { on?: boolean }) {
  return (
    <span
      className={`inline-block h-2.5 w-2.5 rounded-full ${on ? "bg-emerald-400" : "bg-white/15"}`}
      aria-label={on ? "yes" : "no"}
    />
  );
}
