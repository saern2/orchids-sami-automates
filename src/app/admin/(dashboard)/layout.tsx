import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { redirect } from "next/navigation";
import { FolderKanban, MessageSquareQuote, Settings, LogOut, ExternalLink } from "lucide-react";
import { getAdminUser } from "@/lib/auth";
import { signOut } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
};

const nav = [
  { href: "/admin/projects", label: "Projects", Icon: FolderKanban },
  { href: "/admin/testimonials", label: "Testimonials", Icon: MessageSquareQuote },
  { href: "/admin/settings", label: "Settings", Icon: Settings },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  // Second gate after the middleware: the layout itself refuses non-admins.
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");

  return (
    <div className="min-h-screen bg-[#050505] text-white lg:flex">
      <aside className="lg:w-64 shrink-0 border-b lg:border-b-0 lg:border-r border-white/10 bg-[#080808]">
        <div className="p-6 flex items-center justify-between lg:block">
          <Link href="/admin/projects" className="inline-flex">
            <Image src="/logo.png" alt="Sami Automates" width={792} height={285} className="h-9 w-auto" priority />
          </Link>
          <p className="hidden lg:block mt-4 text-[11px] uppercase tracking-widest text-[#A1A1AA] truncate" title={user.email ?? ""}>
            {user.email}
          </p>
        </div>
        <nav className="px-3 pb-3 lg:pb-6 flex lg:flex-col gap-1 overflow-x-auto">
          {nav.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-white/70 hover:text-white hover:bg-white/5 whitespace-nowrap"
            >
              <Icon size={16} /> {label}
            </Link>
          ))}
          <a
            href="/#portfolio"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-white/70 hover:text-white hover:bg-white/5 whitespace-nowrap"
          >
            <ExternalLink size={16} /> View site
          </a>
          <form action={signOut} className="lg:mt-4">
            <button
              type="submit"
              className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-bold text-white/70 hover:text-white hover:bg-white/5 whitespace-nowrap w-full text-left"
            >
              <LogOut size={16} /> Sign out
            </button>
          </form>
        </nav>
      </aside>
      <main className="flex-1 min-w-0 p-6 md:p-10">{children}</main>
    </div>
  );
}
