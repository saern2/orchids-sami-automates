"use client";

import { useState, useTransition } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUp, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import type { Testimonial } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { deleteTestimonial, moveTestimonial, setTestimonialPublished } from "./actions";

export default function TestimonialRowActions({
  item,
  isFirst,
  isLast,
}: {
  item: Testimonial;
  isFirst: boolean;
  isLast: boolean;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pending, startTransition] = useTransition();

  const run = (action: (fd: FormData) => Promise<void>, fields: Record<string, string>) => {
    const fd = new FormData();
    fd.set("id", item.id);
    for (const [k, v] of Object.entries(fields)) fd.set(k, v);
    startTransition(async () => {
      await action(fd);
    });
  };

  const iconBtn = "h-8 w-8 rounded-lg border border-white/10 bg-transparent hover:bg-white/10 text-white/80";

  return (
    <div className="inline-flex items-center gap-1">
      <Button asChild variant="ghost" size="icon" className={iconBtn} title="Edit">
        <Link href={`/admin/testimonials/${item.id}`}>
          <Pencil size={14} />
        </Link>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className={iconBtn}
        title={item.published ? "Unpublish" : "Publish"}
        disabled={pending}
        onClick={() => run(setTestimonialPublished, { value: String(!item.published) })}
      >
        {item.published ? <EyeOff size={14} /> : <Eye size={14} />}
      </Button>
      <Button variant="ghost" size="icon" className={iconBtn} title="Move up" disabled={pending || isFirst} onClick={() => run(moveTestimonial, { direction: "up" })}>
        <ArrowUp size={14} />
      </Button>
      <Button variant="ghost" size="icon" className={iconBtn} title="Move down" disabled={pending || isLast} onClick={() => run(moveTestimonial, { direction: "down" })}>
        <ArrowDown size={14} />
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
            <DialogTitle>Delete testimonial by {item.author}?</DialogTitle>
            <DialogDescription className="text-[#A1A1AA]">This cannot be undone.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)} className="text-white/80">
              Cancel
            </Button>
            <Button
              variant="destructive"
              disabled={pending}
              onClick={() => {
                run(deleteTestimonial, {});
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
