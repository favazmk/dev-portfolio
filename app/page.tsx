import { getArchive } from "@/lib/github";
import Paper from "@/components/ui/Paper";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Work from "@/components/sections/Work";
import Archive from "@/components/sections/Archive";
import Contact from "@/components/sections/Contact";

export const revalidate = 86400;

export default async function Page() {
  const archive = await getArchive();

  return (
    <Paper>
      <Nav />
      <main id="content">
        <Hero />
        <About />
        <Work />
        <Archive items={archive} />
        <Contact />
      </main>
    </Paper>
  );
}
