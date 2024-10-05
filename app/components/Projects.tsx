"use client";

import React, { useEffect, useRef } from "react";
import { useDarkMode } from "./DarkModeContext";
import AOS from "aos";
import "aos/dist/aos.css";

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
      video: "https://www.youtube.com/embed/BU2-Aq5JT0k",
      url: "https://fastxr.jonas-soderholm.dev/",
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
    },
    {
      title: "3D Showroom",
      description: "KTM EXC 450.",
      language: ["Three.js", "React", "React Fiber"],
      image: "/450.png",
      url: "https://project-450.netlify.app/",
    },
    {
      title: "Folkets reklam",
      description: "Donate towards a better society!",
      language: ["Django", "React", "MongoDB", "CRUD", "Animations"],
      image: "/folkets.png",
      url: "https://folketsreklam.jonas-soderholm.dev/",
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
        className={`border-2 p-2 shadow-2xl border-gray-300 border-opacity-10 m-2 rounded-lg hover:cursor-pointer ${
          darkMode ? "bg-dark" : "bg-light"
        }`}
        onClick={() => handleCardClick(properties.url)}
        // data-aos="flip-right" // Added AOS animation
      >
        <div
          className={`flex flex-col mx-2 items-center ${
            darkMode ? "text-dark" : "text-light"
          } mt-4`}
        >
          <h2 className="md:text-3xl text-xl font-semibold header-font mb-3">
            {properties.title}
          </h2>
          <div className="card rounded-3xl md:w-[30rem] w-[18rem] flex flex-col items-center">
            {properties.video ? (
              <iframe
                src={properties.video}
                title={properties.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-2xl md:w-[30rem] md:h-[17rem] h-[12rem] w-auto object-cover transition duration-300 ease-in-out transform hover:brightness-75"
              ></iframe>
            ) : (
              <img
                src={properties.image}
                alt={properties.title}
                className="rounded-2xl md:w-[30rem] md:h-[17rem] w-[25rem] h-[12rem] object-cover transition duration-300 ease-in-out transform hover:brightness-75"
              />
            )}
            <p className="md:text-xl text-center mt-4">
              {properties.description}
            </p>
            <div className="p-3 flex flex-col items-center">
              <div className="flex flex-wrap gap-2 mb-2 justify-center">
                {properties.language.map((language, index) => (
                  <div
                    key={index}
                    className="bg-stone-800 text-xs text-gray-200 py-1 px-2 rounded-full md:text-sm text-[8px]"
                  >
                    {language}
                  </div>
                ))}
              </div>
            </div>
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
        style={{ maxWidth: "1500px" }}
        ref={containerRef}
      >
        <div
          className="containerZZ individual-cards flex flex-wrap justify-center m-5 md:gap-20"
          style={{ height: "auto" }}
        >
          <RenderCards />
        </div>
      </div>
    </>
  );
}

export default Projects;
