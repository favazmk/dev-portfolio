import { getProjects } from "@/lib/github";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import GrainOverlay from "@/components/GrainOverlay";
import SceneCanvas from "@/components/three/SceneCanvas";
import Nav from "@/components/Nav";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Timeline from "@/components/sections/Timeline";
import Contact from "@/components/sections/Contact";

export const revalidate = 86400;

export default async function Page() {
  const projects = await getProjects();

  return (
    <>
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[110] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2"
      >
        Skip to content
      </a>
      <Preloader />
      <SmoothScroll />
      <Cursor />
      <GrainOverlay />
      <SceneCanvas />
      <Nav />
      <main id="content" className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects projects={projects} />
        <Timeline />
        <Contact />
      </main>
    </>
  );
}
