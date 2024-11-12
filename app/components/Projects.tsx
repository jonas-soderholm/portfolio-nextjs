"use client";

import React, { useEffect, useRef } from "react";
import { useDarkMode } from "./DarkModeContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaGithub } from "react-icons/fa"; // Import FontAwesome GitHub icon
import { FiExternalLink } from "react-icons/fi";

function Projects() {
  const containerRef = useRef(null);
  const { darkMode } = useDarkMode();

  const cards = [
    {
      title: "FastXR",
      description:
        "Upload 3D models through the web app and access them in the multiuser VR app.",
      language: [
        "React",
        "Django",
        "MySQL",
        "Azure",
        "Blob",
        "Authentication",
        "Unity",
        "C#",
        "Unity VR Multiplayer",
      ],
      image: "https://www.youtube.com/embed/BU2-Aq5JT0k",
      url: "https://www.youtube.com/embed/BU2-Aq5JT0k",
      gitsource: "https://github.com/jonas-soderholm/vr-showroom",
    },
    {
      title: "Saveer",
      description: "Search for series/movies and save them to your profile",
      language: [
        "Django",
        "Django REST Framework",
        "React",
        "MySQL",
        "JWT Token Authentication",
      ],
      image: "/saveer_dark.png",
      url: "https://saveer.jonas-soderholm.dev/",
      gitsource: "https://github.com/jonas-soderholm/movie-saver",
    },
    {
      title: "3D Showroom",
      description: "KTM EXC 450.",
      language: ["Three.js", "React", "React Fiber"],
      image: "/450.png",
      url: "https://project-450.netlify.app/",
      gitsource: "https://github.com/jonas-soderholm/450exc-project",
    },
    {
      title: "MapTagger",
      description: "Share your marks!",
      language: [
        "Node",
        "Express",
        "React",
        "MySQL",
        "Authentication",
        "Share tags!",
      ],
      image: "/maptagger.png",
      url: "https://maptagger.xyz",
      gitsource: "https://github.com/jonas-soderholm/map-tagger",
    },
    {
      title: "Folkets reklam",
      description: "Donate towards a better society!",
      language: ["Django", "React", "MongoDB", "CRUD", "Animations"],
      image: "/folkets.png",
      url: "https://folketsreklam.jonas-soderholm.dev/",
      gitsource: "https://github.com/jonas-soderholm/folkets-reklam",
    },
  ];

  const handleCardClick = (url: string) => {
    window.open(url, "_blank");
  };

  useEffect(() => {
    AOS.init({ duration: 200 });
  }, []);

  function RenderCards() {
    return cards.map((properties) => (
      <div
        key={properties.title}
        className={`shadow-2xl border-opacity-10 m-2 border-2 border-stone-800 rounded-lg overflow-hidden flex flex-col text-slate-200 bg-stone-800 md:w-[20rem] w-[18rem] h-[480px]`}
      >
        {properties.title === "FastXR" ? ( // Check if the title is "FastXR"
          <iframe
            width="100%"
            height="200px"
            src="https://www.youtube.com/embed/BU2-Aq5JT0k?autoplay=1&loop=1&playlist=BU2-Aq5JT0k&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&mute=1"
            title={properties.title}
            frameBorder="0"
            allow="autoplay"
            className="object-cover"
          ></iframe>
        ) : (
          <img
            src={properties.image}
            alt={properties.title}
            className="w-full h-[200px] object-cover"
          />
        )}
        <div className="flex flex-col flex-grow p-3">
          <h2 className="text-xl header-font font-semibold mb-1">
            {properties.title}
          </h2>
          <p
            className="md:text-xs flex-grow overflow-hidden"
            style={{ maxHeight: "4.5em" }}
          >
            {properties.description}
          </p>
          <div className="flex flex-wrap gap-2 my-4">
            {properties.language.map((language, index) => (
              <div
                key={index}
                className="bg-gray-600 text-[12px] text-gray-200 py-1 px-2 rounded-full"
              >
                {language}
              </div>
            ))}
          </div>
          <div className="mt-auto flex gap-2 text-[12px]">
            <button
              onClick={() => window.open(properties.url, "_blank")}
              className="flex items-center hover:bg-[#66a430] text-black bg-[#8eff2b] font-bold py-1 px-2 rounded"
            >
              <FiExternalLink className="mr-1" /> Website
            </button>
            <button
              onClick={() => window.open(properties.gitsource, "_blank")}
              className="flex items-center text-black bg-[#8eff2b] hover:bg-[#66a430] font-bold px-2 rounded"
            >
              <FaGithub className="mr-1" /> Source
            </button>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <>
      <div id="projects"></div>
      <div
        className={`toolkit-header ${
          darkMode ? "text-dark" : "text-light"
        } project-header flex flex-col items-center text-center md:text-7xl text-4xl mt-36 mb-10`}
      >
        <div className="font-bold header-font">Projects</div>
        <div className="text-2xl body-text-medium">
          Have a look at my latest work!
        </div>
      </div>
      <div className="toggle-buttons flex justify-center mt-4 mx-4"></div>

      <div
        className="card-container mx-auto mt-8 scrollbar-hide body-text-medium"
        style={{ maxWidth: "1300px" }}
        ref={containerRef}
      >
        <div
          className="containerZZ individual-cards flex flex-wrap justify-center m-5 "
          style={{ height: "auto" }}
        >
          <RenderCards />
        </div>
      </div>
    </>
  );
}
export default Projects;
