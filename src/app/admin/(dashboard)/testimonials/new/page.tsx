import TestimonialForm from "../testimonial-form";

export const dynamic = "force-dynamic";

export default function NewTestimonialPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-black">New testimonial</h1>
      <TestimonialForm item={null} />
    </div>
  );
}
