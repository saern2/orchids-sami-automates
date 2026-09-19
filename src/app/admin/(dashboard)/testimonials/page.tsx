import Link from "next/link";
import { Plus } from "lucide-react";
import { listTestimonials } from "@/lib/admin-data";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import TestimonialRowActions from "./row-actions";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const [items, { saved }] = await Promise.all([listTestimonials(), searchParams]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Testimonials</h1>
          <p className="text-sm text-[#A1A1AA] mt-1">
            {items.length} total · {items.filter((t) => t.published).length} published
          </p>
        </div>
        <Button asChild className="font-bold">
          <Link href="/admin/testimonials/new">
            <Plus size={16} /> New testimonial
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
              <TableHead className="text-[#A1A1AA]">Author</TableHead>
              <TableHead className="text-[#A1A1AA]">Quote</TableHead>
              <TableHead className="text-[#A1A1AA]">Source</TableHead>
              <TableHead className="text-[#A1A1AA] text-right">Rating</TableHead>
              <TableHead className="text-[#A1A1AA]">Published</TableHead>
              <TableHead className="text-[#A1A1AA] text-right">Order</TableHead>
              <TableHead className="text-[#A1A1AA] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 && (
              <TableRow className="border-white/10">
                <TableCell colSpan={7} className="text-center text-[#A1A1AA] py-10">
                  No testimonials yet. Real reviews are added in Round 3.
                </TableCell>
              </TableRow>
            )}
            {items.map((t, i) => (
              <TableRow key={t.id} className="border-white/10">
                <TableCell className="font-bold">
                  <Link href={`/admin/testimonials/${t.id}`} className="hover:text-purple-400">
                    {t.author}
                  </Link>
                  {t.country && <div className="text-[11px] text-[#A1A1AA] font-normal">{t.country}</div>}
                </TableCell>
                <TableCell className="text-white/80 max-w-md truncate">{t.quote}</TableCell>
                <TableCell className="text-white/80">{t.source}</TableCell>
                <TableCell className="text-right tabular-nums">{t.rating ?? "none"}</TableCell>
                <TableCell>
                  <span className={`inline-block h-2.5 w-2.5 rounded-full ${t.published ? "bg-emerald-400" : "bg-white/15"}`} />
                </TableCell>
                <TableCell className="text-right tabular-nums">{t.sort_order}</TableCell>
                <TableCell className="text-right">
                  <TestimonialRowActions item={t} isFirst={i === 0} isLast={i === items.length - 1} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
