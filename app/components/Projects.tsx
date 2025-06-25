// "use client";

// import React, { useEffect, useRef, useState } from "react";
// import { useDarkMode } from "./DarkModeContext";
// import { InfoSkeleton } from "./InfoSkeleton";

// // function LazyVideo({ src, className }: { src: string; className?: string }) {
// //   const ref = useRef<HTMLVideoElement>(null);
// //   const [visible, setVisible] = React.useState(false);

// //   useEffect(() => {
// //     const observer = new IntersectionObserver(
// //       ([entry]) => {
// //         if (entry.isIntersecting) {
// //           setVisible(true);
// //           observer.disconnect();
// //         }
// //       },
// //       { rootMargin: "200px" }
// //     );
// //     if (ref.current) observer.observe(ref.current);
// //     return () => observer.disconnect();
// //   }, []);

// //   return (
// //     <video
// //       ref={ref}
// //       autoPlay
// //       muted
// //       loop
// //       playsInline
// //       preload="none"
// //       className={className}
// //     >
// //       {visible && <source src={src} type="video/mp4" />}
// //     </video>
// //   );
// // }

// function LazyVideo({
//   src,
//   poster,
//   className,
// }: {
//   src: string;
//   poster: string;
//   className?: string;
// }) {
//   const ref = useRef<HTMLDivElement>(null);
//   const [visible, setVisible] = React.useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setVisible(true);
//           observer.disconnect();
//         }
//       },
//       { rootMargin: "200px" }
//     );
//     if (ref.current) observer.observe(ref.current);
//     return () => observer.disconnect();
//   }, []);

//   return (
//     <div
//       ref={ref}
//       className={`relative w-full aspect-[16/9] overflow-hidden rounded-xl ${className}`}
//     >
//       {/* Always show thumbnail */}
//       <img
//         src={poster}
//         alt="Thumbnail"
//         className="w-full h-full object-cover absolute top-0 left-0"
//       />

//       {/* Replace with video when ready */}
//       {visible && (
//         <video
//           autoPlay
//           muted
//           loop
//           playsInline
//           preload="auto"
//           className="w-full h-full object-cover absolute top-0 left-0"
//         >
//           <source src={src} type="video/mp4" />
//         </video>
//       )}
//     </div>
//   );
// }

// function Projects() {
//   const containerRef = useRef(null);
//   const { darkMode } = useDarkMode();

//   const cards = [
//     {
//       title: "Juporia (SaaS)",
//       description:
//         "Cybersecurity and privacy awareness training for teams, business owners, and individuals. Buy individual access or buy for team members.",
//       builtWith: [
//         { logoSrc: "/lock.png", name: "OAuth - Google and Github" },
//         { logoSrc: "/nextjs-logo.png", name: "NextJS" },
//         { logoSrc: "/typescript.png", name: "TypeScript" },
//         { logoSrc: "/supabase.png", name: "Supabase" },
//         { logoSrc: "/prisma-logo.png", name: "Prisma" },
//         { logoSrc: "/stripe-logo.png", name: "Stripe" },
//       ],
//       image: "juporia-frontpage.png",
//       url: "https://juporia.com",
//       gitsource: "https://github.com/jonas-soderholm/juporia",
//     },
//     {
//       title: "Email-based authentication",
//       description:
//         "Full-stack email-based authentication system with secure JWT tokens, NestJS and Next.js. Includes automated testing and CI/CD pipelines for both frontend and backend.",
//       builtWith: [
//         { logoSrc: "/nestjs-logo.png", name: "NestJS" },
//         { logoSrc: "/nextjs-logo.png", name: "Next.js" },
//         { logoSrc: "/lock.png", name: "JWT" },
//         { logoSrc: "/typescript.png", name: "TypeScript" },
//         { logoSrc: "/prisma-logo.png", name: "Prisma" },
//         { logoSrc: "/jest-logo.png", name: "Jest (Testing)" },
//         { logoSrc: "/githubactions-logo.png", name: "GitHub Actions (CI/CD)" },
//       ],
//       image: "auth-mail.png",
//       url: "https://auth.jonas-soderholm.dev/login",
//       gitsource: "https://github.com/jonas-soderholm/nest-next-auth",
//     },
//     {
//       title: "Liquid Glass Noise Interactor",
//       description: "Fluid interaction built on top of Three.js and React.",
//       builtWith: [
//         { logoSrc: "/nextjs-logo.png", name: "NextJS" },
//         { logoSrc: "/threejs-logo.png", name: "Three.js" },
//         { logoSrc: "/react-logo.png", name: "React Fiber" },
//       ],
//       image: "/liquidshader.mp4",
//       url: "https://liquid-interaction.vercel.app/",
//       gitsource: "https://github.com/jonas-soderholm/liquid-interaction",
//       poster: "liquid_thumbnail.png",
//     },
//     {
//       title: "3D Showroom",
//       description:
//         "Interactive 3D KTM EXC 450 model with rotation, and clickable hotspots for part details.",
//       builtWith: [
//         { logoSrc: "/threejs-logo.png", name: "Three.js" },
//         { logoSrc: "/react-logo.png", name: "React" },
//         { logoSrc: "/react-logo.png", name: "React Fiber" },
//       ],
//       image: "/ktm450.mp4",
//       url: "https://project-450.netlify.app/",
//       gitsource: "https://github.com/jonas-soderholm/450exc-project",
//       poster: "ktm_thumbnail.png",
//     },
//     {
//       title: "FastXR",
//       description:
//         "Upload 3D models through the web app and access them in the multiuser VR app.",
//       builtWith: [
//         { logoSrc: "/unity-logo.png", name: "Unity" },
//         { logoSrc: "/unity-logo.png", name: "Meta SDK" },
//         { logoSrc: "/meta-logo.png", name: "React" },
//         { logoSrc: "/django.png", name: "Django" },

//         { logoSrc: "/azure.png", name: "Azure" },
//         { logoSrc: "/unity-logo.png", name: "Unity" },
//         { logoSrc: "/csharp-logo.png", name: "C#" },
//         { logoSrc: "/js-logo.png", name: "JS" },
//       ],
//       image: "/fastxr.mp4",
//       gitsource: "https://github.com/jonas-soderholm/vr-showroom",
//       poster: "xr_thumbnail.png",
//     },
//     // {
//     //   title: "Embedded Starter Kit",
//     //   description: "Retro styled Embedded links",
//     //   builtWith: [{ logoSrc: "/nextjs-logo.png", name: "NextJS" }],
//     //   image: "/embedded.png",
//     //   url: "https://www.embeddedstarterkit.com/",
//     //   gitsource: "https://github.com/jonas-soderholm/embedded",
//     // },
//   ];

//   function RenderCards() {
//     return cards.map((properties) => {
//       let media;
//       if (
//         properties.title === "3D Showroom" ||
//         properties.title === "FastXR" ||
//         properties.title === "Liquid Glass Noise Interactor"
//       ) {
//         media = (
//           <LazyVideo
//             src={properties.image}
//             poster={properties.poster ?? ""}
//             className="w-full h-full object-cover rounded-xl"
//           />
//         );
//       } else {
//         media = (
//           <img
//             src={properties.image}
//             alt={properties.title}
//             className="w-full h-full object-cover rounded-xl"
//           />
//         );
//       }

//       if (properties.url) {
//         media = (
//           <a
//             href={properties.url}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="block"
//           >
//             {media}
//           </a>
//         );
//       }

//       return (
//         <InfoSkeleton
//           key={properties.title}
//           builtWith={properties.builtWith}
//           url={properties.url}
//           gitsource={properties.gitsource}
//         >
//           <div className="rounded-lg overflow-hidden flex flex-col w-full">
//             <div className="text-[2rem] md:text-[4rem] xl:text-[8rem] header-font text-blackish leading-[0.9] mb-4 mt-4">
//               {properties.title}
//             </div>
//             <div className="text-[1rem] md:text-[1.5rem] xl:text-[2.5rem] text-blackish leading-tight mb-8">
//               {properties.description}
//             </div>
//             {media}
//           </div>
//         </InfoSkeleton>
//       );
//     });
//   }

//   return (
//     <>
//       <div
//         className={`toolkit-header ${
//           darkMode ? "text-dark" : "text-light"
//         } project-header flex flex-col items-center text-center md:text-7xl text-4xl mt-36 mb-10`}
//       >
//         <div className="font-bold header-font">Solo Projects</div>
//         <div className="text-2xl body-text-medium">
//           Have a look at my latest work!
//         </div>
//       </div>

//       <div id="projects" ref={containerRef} className="w-screen mt-8">
//         <div className="flex flex-col gap-8">
//           <RenderCards />
//         </div>
//       </div>
//     </>
//   );
// }
// export default Projects;

"use client";

import React, { useEffect, useRef, useState } from "react";
import { useDarkMode } from "./DarkModeContext";
import { InfoSkeleton } from "./InfoSkeleton";

function LazyVideo({
  src,
  poster,
  className,
  visible,
}: {
  src: string;
  poster: string;
  className?: string;
  visible: boolean;
}) {
  return (
    <div
      className={`relative w-full aspect-[16/9] overflow-hidden rounded-xl ${className}`}
    >
      <img
        src={poster}
        alt="Thumbnail"
        className="w-full h-full object-cover absolute top-0 left-0"
      />
      {visible && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover absolute top-0 left-0"
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
    </div>
  );
}

function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { darkMode } = useDarkMode();
  const [videosVisible, setVideosVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVideosVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      image: "juporia-frontpage.png",
      url: "https://juporia.com",
      gitsource: "https://github.com/jonas-soderholm/juporia",
    },
    {
      title: "Email-based authentication",
      description:
        "Full-stack email-based authentication system with secure JWT tokens, NestJS and Next.js. Includes automated testing and CI/CD pipelines for both frontend and backend.",
      builtWith: [
        { logoSrc: "/nestjs-logo.png", name: "NestJS" },
        { logoSrc: "/nextjs-logo.png", name: "Next.js" },
        { logoSrc: "/lock.png", name: "JWT" },
        { logoSrc: "/typescript.png", name: "TypeScript" },
        { logoSrc: "/prisma-logo.png", name: "Prisma" },
        { logoSrc: "/jest-logo.png", name: "Jest (Testing)" },
        { logoSrc: "/githubactions-logo.png", name: "GitHub Actions (CI/CD)" },
      ],
      image: "auth-mail.png",
      url: "https://auth.jonas-soderholm.dev/login",
      gitsource: "https://github.com/jonas-soderholm/nest-next-auth",
    },
    {
      title: "Liquid Glass Noise Interactor",
      description: "Fluid interaction built on top of Three.js and React.",
      builtWith: [
        { logoSrc: "/nextjs-logo.png", name: "NextJS" },
        { logoSrc: "/threejs-logo.png", name: "Three.js" },
        { logoSrc: "/react-logo.png", name: "React Fiber" },
      ],
      image: "/liquidshader.mp4",
      url: "https://liquid-interaction.vercel.app/",
      gitsource: "https://github.com/jonas-soderholm/liquid-interaction",
      poster: "liquid_thumbnail.png",
    },
    {
      title: "3D Showroom",
      description:
        "Interactive 3D KTM EXC 450 model with rotation, and clickable hotspots for part details.",
      builtWith: [
        { logoSrc: "/threejs-logo.png", name: "Three.js" },
        { logoSrc: "/react-logo.png", name: "React" },
        { logoSrc: "/react-logo.png", name: "React Fiber" },
      ],
      image: "/ktm450.mp4",
      url: "https://project-450.netlify.app/",
      gitsource: "https://github.com/jonas-soderholm/450exc-project",
      poster: "ktm_thumbnail.png",
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
      image: "/fastxr.mp4",
      gitsource: "https://github.com/jonas-soderholm/vr-showroom",
      poster: "xr_thumbnail.png",
    },
  ];

  function RenderCards() {
    return cards.map((properties) => {
      const isVideo =
        properties.title === "3D Showroom" ||
        properties.title === "FastXR" ||
        properties.title === "Liquid Glass Noise Interactor";

      let media = isVideo ? (
        <LazyVideo
          src={properties.image}
          poster={properties.poster ?? ""}
          className="w-full h-full object-cover rounded-xl"
          visible={videosVisible}
        />
      ) : (
        <img
          src={properties.image}
          alt={properties.title}
          className="w-full h-full object-cover rounded-xl"
        />
      );

      if (properties.url) {
        media = (
          <a
            href={properties.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            {media}
          </a>
        );
      }

      return (
        <InfoSkeleton
          key={properties.title}
          builtWith={properties.builtWith}
          url={properties.url}
          gitsource={properties.gitsource}
        >
          <div className="rounded-lg overflow-hidden flex flex-col w-full">
            <div className="text-[2rem] md:text-[4rem] xl:text-[8rem] header-font text-blackish leading-[0.9] mb-4 mt-4">
              {properties.title}
            </div>
            <div className="text-[1rem] md:text-[1.5rem] xl:text-[2.5rem] text-blackish leading-tight mb-8">
              {properties.description}
            </div>
            {media}
          </div>
        </InfoSkeleton>
      );
    });
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
