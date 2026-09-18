import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sami Automates | Premier AI Workflow Automation Agency",
  description: "Achieving 10x efficiency gains through autonomous AI systems and custom workflow automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
