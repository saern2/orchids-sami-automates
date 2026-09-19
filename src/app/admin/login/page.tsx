import type { Metadata } from "next";
import Image from "next/image";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-[#050505]">
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-10">
          <Image src="/logo.png" alt="Sami Automates" width={792} height={285} className="h-12 w-auto" priority />
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <h1 className="text-2xl font-black text-white mb-2">Admin sign in</h1>
          <p className="text-sm text-[#A1A1AA] mb-8">Content editing for samiautomates.</p>
          <LoginForm notAllowed={error === "not_allowed"} />
        </div>
      </div>
    </main>
  );
}
