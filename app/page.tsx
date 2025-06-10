import DarkModeWrapper from "./components/DarkModeWrapper";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Toolkit from "./components/Toolkit";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import TimeLine from "./components/TimeLine";
import FluidCanvas from "./components/FluidCanvas";

import CanvasWrapper from "./components/CanvasWrapper";

export default function Home() {
  return (
    <>
      <CanvasWrapper />
      {/* <DarkModeWrapper>
        <FluidCanvas />
        <Navbar />
        <Hero />
        <Projects />
        <Toolkit />
        <TimeLine />
        <Experience />
        <Contact />
      </DarkModeWrapper> */}
    </>
  );
}
