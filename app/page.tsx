import React from "react";
import DarkModeWrapper from "./components/DarkModeWrapper";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Toolkit from "./components/Toolkit";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <DarkModeWrapper>
      <Navbar />
      <Hero />
      <Toolkit />
      <Projects />
      <Experience />
      <Contact />
    </DarkModeWrapper>
  );
}
