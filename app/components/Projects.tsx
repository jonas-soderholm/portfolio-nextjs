"use client";

import React, { useEffect, useRef } from "react";
import { useDarkMode } from "./DarkModeContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { InfoSkeleton } from "./InfoSkeleton";

function Projects() {
  const containerRef = useRef(null);
  const { darkMode } = useDarkMode();

  const cards = [
    {
      title: "Juporia (SaaS)",
      description:
        "Cybersecurity and privacy awareness training for teams, business owners, and individuals. Buy individual access or buy for team members.",
      builtWith: [
        { logoSrc: "/lock.png", name: "OAuth - Google and Github" },
        { logoSrc: "/nextjs-logo.png", name: "NextJS" },
        { logoSrc: "/typescript.png", name: "TypeScript" },
        { logoSrc: "/supabase.png", name: "Supabase" },
        { logoSrc: "/prisma-logo.png", name: "Prisma" },
        { logoSrc: "/stripe-logo.png", name: "Stripe" },
      ],
      image: "device-mockup2.png",
      url: "https://juporia.com",
      gitsource: "https://github.com/jonas-soderholm/juporia",
    },
    {
      title: "Email-based authentication",
      description:
        "Full-stack email-based authentication system with secure JWT tokens, NestJS and Next.js.",
      builtWith: [
        { logoSrc: "/nestjs-logo.png", name: "NestJS" },
        { logoSrc: "/nextjs-logo.png", name: "NextJS" },
        { logoSrc: "/testing.png", name: "Testing" },
        { logoSrc: "/lock.png", name: "JWT" },
        { logoSrc: "/typescript.png", name: "TypeScript" },
        { logoSrc: "/prisma-logo.png", name: "Prisma" },
      ],
      image: "auth-mail.png",
      url: "https://auth.jonas-soderholm.dev/login",
      gitsource: "https://github.com/jonas-soderholm/nest-next-auth",
    },
    {
      title: "FastXR",
      description:
        "Upload 3D models through the web app and access them in the multiuser VR app.",
      builtWith: [
        { logoSrc: "/unity-logo.png", name: "Unity" },
        { logoSrc: "/unity-logo.png", name: "Meta SDK" },
        { logoSrc: "/meta-logo.png", name: "React" },
        { logoSrc: "/django.png", name: "Django" },

        { logoSrc: "/azure.png", name: "Azure" },
        { logoSrc: "/unity-logo.png", name: "Unity" },
        { logoSrc: "/csharp-logo.png", name: "C#" },
        { logoSrc: "/js-logo.png", name: "JS" },
      ],
      image: "https://www.youtube.com/embed/BU2-Aq5JT0k",
      url: "https://www.youtube.com/embed/BU2-Aq5JT0k",
      gitsource: "https://github.com/jonas-soderholm/vr-showroom",
    },
    {
      title: "3D Showroom",
      description: "KTM EXC 450.",
      builtWith: [
        { logoSrc: "/threejs-logo.png", name: "Three.js" },
        { logoSrc: "/react-logo.png", name: "React" },
        { logoSrc: "/react-logo.png", name: "React Fiber" },
      ],
      image: "/450.png",
      url: "https://project-450.netlify.app/",
      gitsource: "https://github.com/jonas-soderholm/450exc-project",
    },
    {
      title: "Embedded Starter Kit",
      description: "Retro styled Embedded links",
      builtWith: [{ logoSrc: "/nextjs-logo.png", name: "NextJS" }],
      image: "/embedded.png",
      url: "https://www.embeddedstarterkit.com/",
      gitsource: "https://github.com/jonas-soderholm/embedded",
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 200 });
  }, []);

  function RenderCards() {
    return cards.map((properties) => (
      <InfoSkeleton
        key={properties.title}
        builtWith={properties.builtWith}
        url={properties.url}
        gitsource={properties.gitsource}
      >
        <div className="rounded-lg overflow-hidden flex flex-col w-full">
          {properties.title === "FastXR" ? (
            <iframe
              width="100%"
              height="800px"
              src="https://www.youtube.com/embed/BU2-Aq5JT0k?autoplay=1&loop=1&playlist=BU2-Aq5JT0k&controls=0&modestbranding=1&showinfo=0&rel=0&iv_load_policy=3&mute=1"
              title={properties.title}
              frameBorder="0"
              allow="autoplay"
              className="object-cover"
            ></iframe>
          ) : (
            <>
              <div className="text-[8rem] header-font text-blackish">
                {properties.title}
              </div>
              <div className="text-[3rem] text-blackish">
                {properties.description}
              </div>
              <img
                src={properties.image}
                alt={properties.title}
                className="w-full h-full object-cover"
              />
            </>
          )}
        </div>
      </InfoSkeleton>
    ));
  }

  return (
    <>
      <div
        className={`toolkit-header ${
          darkMode ? "text-dark" : "text-light"
        } project-header flex flex-col items-center text-center md:text-7xl text-4xl mt-36 mb-10`}
      >
        <div className="font-bold header-font">Solo Projects</div>
        <div className="text-2xl body-text-medium">
          Have a look at my latest work!
        </div>
      </div>

      <div id="projects" ref={containerRef} className="w-screen mt-8">
        <div className="flex flex-col gap-8">
          <RenderCards />
        </div>
      </div>
    </>
  );
}
export default Projects;
