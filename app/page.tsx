import DarkModeWrapper from "./components/DarkModeWrapper";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Toolkit from "./components/Toolkit";
import Projects from "./components/Projects";
import More from "./components/More";
import Contact from "./components/Contact";
import TimeLine from "./components/TimeLine";
import ClientOnlyFluidCanvas from "./components/ClientOnlyFluidCanvas";
import FakeLoadBackground from "./components/MobileBackground";

// Import dynamic from next
import dynamic from "next/dynamic";

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
      {/* SSR-friendly image: always shows instantly */}
      <div className="fixed inset-0 z-[-10]">
        <img
          src="/start_gradient_background.webp"
          className="w-full h-full object-cover absolute inset-0 z-[-20] animate-fade-in"
        />
      </div>
      <DarkModeWrapper>
        {/* Mobile video or Three.js only after hydration */}
        <FakeLoadBackground />
        <ClientOnlyFluidCanvas />

        {/* Rest of UI */}
        <Navbar />
        <Hero />
        <Projects />
        <Toolkit />
        <TimeLine />
        <More />
        <Contact />
      </DarkModeWrapper>
    </>
  );
}
