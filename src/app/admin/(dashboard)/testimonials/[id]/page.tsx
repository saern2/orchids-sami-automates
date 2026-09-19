import { notFound } from "next/navigation";
import { getTestimonialById } from "@/lib/admin-data";
import TestimonialForm from "../testimonial-form";

export const dynamic = "force-dynamic";

const uuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function EditTestimonialPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!uuid.test(id)) notFound();
  const item = await getTestimonialById(id);
  if (!item) notFound();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-black">{item.author}</h1>
        <p className="text-sm text-[#A1A1AA] mt-1">Editing testimonial</p>
      </div>
      <TestimonialForm item={item} />
    </div>
  );
}
