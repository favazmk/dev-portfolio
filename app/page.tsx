import { getArchive } from "@/lib/github";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import Index from "@/components/sections/Index";
import Profile from "@/components/sections/Profile";
import Clients from "@/components/sections/Clients";
import Work from "@/components/sections/Work";
import Content from "@/components/sections/Content";
import Archive from "@/components/sections/Archive";
import Contact from "@/components/sections/Contact";
import KineticMarquee from "@/components/KineticMarquee";
import { site } from "@/config/site";

export const revalidate = 86400;

export default async function Page() {
  const archive = await getArchive();

  return (
    <>
      <Nav />
      <main id="content">
        <Hero />
        <Index />
        <KineticMarquee items={site.kinetic.opening} />
        <Profile />
        <Clients />
        <Work />
        <Content />
        <Archive items={archive} />
        <KineticMarquee items={site.kinetic.closing} reverse onDark />
        <Contact />
      </main>
    </>
  );
}
