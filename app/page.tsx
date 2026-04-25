import DarkModeWrapper from "./components/DarkModeWrapper";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Toolkit from "./components/Toolkit";
import Projects from "./components/Projects";
import More from "./components/More";
import Contact from "./components/Contact";
import TimeLine from "./components/TimeLine";
import AppBackground from "./components/AppBackground";
import Script from "next/script";

// Lazy-load heavy sections
// const LazyToolkit = dynamic(() => import("./components/Toolkit"), {
//   ssr: false,
//   loading: () => null,
// });

// const LazyProjects = dynamic(() => import("./components/Projects"), {
//   ssr: false,
//   loading: () => null,
// });

export default function Home() {
  return (
    <>
      <DarkModeWrapper>
        <AppBackground />
        {/* Rest of UI */}
        <Navbar />
        <Hero />
        {/* <Projects /> */}
        <Toolkit />
        {/* <TimeLine /> */}
        {/* <More /> */}
        {/* <Contact /> */}
        <div className="pb-20"></div>
      </DarkModeWrapper>
    </>
  );
}
