"use client";

import { useState, useEffect } from "react";
import { BsFillMoonStarsFill, BsSunFill } from "react-icons/bs";
import { useDarkMode } from "./DarkModeContext";

function Navbar() {
  const [navPos, setNavPos] = useState(-80);
  const { darkMode, toggleDarkMode } = useDarkMode();

  function DarkModeButton() {
    return (
      <button
        className="darkmode-icon mx-1 hover:text-slate-500 flex items-center px-3 text-xl "
        onClick={toggleDarkMode}
      >
        {darkMode ? <BsSunFill /> : <BsFillMoonStarsFill />}
      </button>
    );
  }

  function GoToSection(sectionId: string) {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  }

  function ClassicNavLinks({
    children,
    sectionId,
  }: {
    children: React.ReactNode;
    sectionId: string;
  }) {
    return (
      <button
        onClick={() => GoToSection(sectionId)}
        className={`rounded-full py-2 md:hover:bg-slate-600`}
      >
        <a className=" mx-2">{children}</a>
      </button>
    );
  }

  //Fade in navbar
  useEffect(() => {
    setTimeout(() => {
      setNavPos(0);
    }, 0);
  }, []);

  return (
    <>
      <div
        className={`${
          darkMode ? "text-dark" : "text-light"
        } navbar-containe sticky flex justify-center items-center 
        z-20 transition-top ease-in-out duration-300 body-text-medium pointer-events-none`}
        style={{
          top: "0",
          transform: `translateY(${navPos}px)`,
          transition: "transform 0.3s ease-in-out, color 0.5s ease-in-out",
        }}
      >
        <div className="nav-links overflow-hidden pointer-events-auto">
          <ul className="flex">
            <a
              className="darkmode-icon hover:text-slate-500 flex"
              href="https://www.google.se"
              target="_blank"
              rel="noopener noreferrer"
            ></a>
            <li
              className={`${
                darkMode ? "nav-bar-dark" : "nav-bar-light"
              } rounded-full md:px-5 px-3 py-2 
              md:text-[1rem] text-[3.5vw] backdrop-blur-lg mt-5 overflow-hidden`}
            >
              <div className="flex gap-0 items-center ">
                <ClassicNavLinks sectionId="toolkit">Toolkit</ClassicNavLinks>
                <ClassicNavLinks sectionId="projects">Projects</ClassicNavLinks>
                <div className="darkmode-normal">
                  <DarkModeButton />
                </div>
                <ClassicNavLinks sectionId="experience">More</ClassicNavLinks>
                <ClassicNavLinks sectionId="contact">Contact</ClassicNavLinks>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Navbar;
