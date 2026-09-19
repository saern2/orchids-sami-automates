"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, Eye, EyeOff, Pencil, Star, StarOff, Trash2, ExternalLink } from "lucide-react";
import type { Project } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteProject, moveProject, setFeatured, setPublished } from "./actions";

export default function ProjectRowActions({
  project,
  isFirst,
  isLast,
}: {
  project: Project;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const run = (action: (fd: FormData) => Promise<void>, fields: Record<string, string>) => {
    const fd = new FormData();
    fd.set("id", project.id);
    for (const [k, v] of Object.entries(fields)) fd.set(k, v);
    startTransition(async () => {
      await action(fd);
    });
  };

  const iconBtn = "h-8 w-8 rounded-lg border border-white/10 bg-transparent hover:bg-white/10 text-white/80";

  return (
    <div className="inline-flex items-center gap-1">
      <Button asChild variant="ghost" size="icon" className={iconBtn} title="Edit">
        <Link href={`/admin/projects/${project.id}`}>
          <Pencil size={14} />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={iconBtn}
        title={project.published ? "Unpublish" : "Publish"}
        disabled={pending}
        onClick={() => run(setPublished, { value: String(!project.published) })}
      >
        {project.published ? <EyeOff size={14} /> : <Eye size={14} />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={iconBtn}
        title={project.featured ? "Remove from home page" : "Feature on home page"}
        disabled={pending}
        onClick={() => run(setFeatured, { value: String(!project.featured) })}
      >
        {project.featured ? <StarOff size={14} /> : <Star size={14} />}
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={iconBtn}
        title="Move up"
        disabled={pending || isFirst}
        onClick={() => run(moveProject, { direction: "up" })}
      >
        <ArrowUp size={14} />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={iconBtn}
        title="Move down"
        disabled={pending || isLast}
        onClick={() => run(moveProject, { direction: "down" })}
      >
        <ArrowDown size={14} />
      </Button>
      <Button asChild variant="ghost" size="icon" className={iconBtn} title="View on site">
        <a href="/#portfolio" target="_blank" rel="noreferrer">
          <ExternalLink size={14} />
        </a>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={`${iconBtn} hover:bg-red-500/20 hover:text-red-300`}
        title="Delete"
        disabled={pending}
        onClick={() => setConfirmOpen(true)}
      >
        <Trash2 size={14} />
      </Button>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent className="bg-[#0a0a0a] border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>Delete “{project.title}”?</DialogTitle>
            <DialogDescription className="text-[#A1A1AA]">
              This removes the project and its uploaded images. It cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)} className="text-white/80">
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="bg-red-600 hover:bg-red-500 text-white font-bold"
              disabled={pending}
              onClick={() => {
                run(deleteProject, {});
                setConfirmOpen(false);
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
