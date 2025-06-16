import DarkModeWrapper from "./components/DarkModeWrapper";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Toolkit from "./components/Toolkit";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import TimeLine from "./components/TimeLine";
import FluidCanvas from "./components/FluidCanvas";

export default function Home() {
  return (
    <>
      <DarkModeWrapper>
        {/* first frame of video as fallback */}
        <div className="fixed inset-0 z-[-10]">
          <img
            src="/start_gradient_background.png"
            alt="Fallback Background"
            className="w-full h-full object-cover absolute inset-0 z-[-20] opacity-20 animate-fade-in"
          />
        </div>
        <FluidCanvas />
        <Navbar />
        <Hero />
        <Projects />
        <Toolkit />
        <TimeLine />
        <Experience />
        <Contact />
      </DarkModeWrapper>
    </>
  );
}
