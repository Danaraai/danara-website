import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <Navigation />
      <main className="relative">
        <Hero />
        <ProjectsSection />
      </main>
      <Footer />
      <ChatWidget />
    </>
  );
}
