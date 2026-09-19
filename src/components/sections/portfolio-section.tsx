import PortfolioGrid from "@/components/sections/portfolio-grid";
import { getFeaturedProjects } from "@/lib/content";

// Server component: fetches featured, published projects (cached, tag
// "content") and hands them to the client grid + modal.
export default async function PortfolioSection() {
  const projects = await getFeaturedProjects();
  return <PortfolioGrid projects={projects} />;
}
