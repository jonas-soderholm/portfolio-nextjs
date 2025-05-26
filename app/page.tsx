import DarkModeWrapper from "./components/DarkModeWrapper";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Toolkit from "./components/Toolkit";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import TimeLine from "./components/TimeLine";
import BackgroundCanvas from "./components/BackgroundCanvas";

export default function Home() {
  return (
    <>
      <BackgroundCanvas />
      <DarkModeWrapper>
        <Navbar />
        <Hero />
        <Toolkit />
        <Projects />
        <TimeLine />
        <Experience />
        <Contact />
      </DarkModeWrapper>
    </>
  );
}
