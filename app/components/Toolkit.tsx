"use client";

import React, { useEffect } from "react";
import { useDarkMode } from "./DarkModeContext";
import AOS from "aos";
import "aos/dist/aos.css";
import { BorderBeam } from "./ui/border-beam";

const web_tools = [
  { logoSrc: "/typescript.png", name: "TypeScript" },
  { logoSrc: "/react-logo.png", name: "React/Next" },
  { logoSrc: "/js-logo.png", name: "JavaScript" },
  { logoSrc: "/python.png", name: "Python" },
  { logoSrc: "/django.png", name: "Django" },
  { logoSrc: "/node-logo.png", name: "Node.js" },
  { logoSrc: "/express-logo.png", name: "Express" },
  { logoSrc: "/threejs-logo.png", name: "Three.js" },
  { logoSrc: "/database.png", name: "SQL/NoSQL" },
  // { logoSrc: "/tailwind-logo.png", name: "Tailwind" },
  // { logoSrc: "/bootstrap.png", name: "Bootstrap" },
  { logoSrc: "/vs-logo.png", name: "VS Code" },
  { logoSrc: "/linux-logo.png", name: "Linux" },
  { logoSrc: "/windows-logo.png", name: "Windows" },
];

const xr_tools = [
  { logoSrc: "/unity-logo.png", name: "Unity" },
  { logoSrc: "/csharp-logo.png", name: "C#" },
  { logoSrc: "/plastic-logo.png", name: "Plastic SCM" },
  { logoSrc: "/unity-logo.png", name: "Unity Cloud" },
  { logoSrc: "/unity-logo.png", name: "Unity DevOps" },
  { logoSrc: "/openxr-logo.png", name: "OpenXR" },
  { logoSrc: "/unity-logo.png", name: "XR Interaction Toolkit" },
  { logoSrc: "/meta-logo.png", name: "Meta SDK" },
  { logoSrc: "/photon-logo.png", name: "Photon PUN" },
  { logoSrc: "/meta-logo.png", name: "Meta Quest 1-3" },
];

const devops_tools = [
  { logoSrc: "/docker-logo.png", name: "Docker" },
  { logoSrc: "/kubernetes.png", name: "Kubernetes" },
  { logoSrc: "/gitactions.png", name: "Git Actions" },
  { logoSrc: "/github-logo.png", name: "Github" },
  { logoSrc: "/gitlab.png", name: "Gitlab" },
  { logoSrc: "/azure.png", name: "Azure" },
  { logoSrc: "/argocd.png", name: "ArgoCD" },
  { logoSrc: "/rancher.png", name: "Rancher" },
  { logoSrc: "/terraform.png", name: "Terraform" },
  { logoSrc: "/prometheus.png", name: "Prometheus" },
  { logoSrc: "/loki.png", name: "Loki" },
  { logoSrc: "/grafana.png", name: "Grafana" },
];

function Toolkit() {
  const { darkMode } = useDarkMode();

  useEffect(() => {
    AOS.init({ duration: 350 });
  }, []);

  const renderToolSection = (
    tools: { logoSrc: string; name: string }[],
    title: string
  ) => (
    <div
      className="font-bold bg-stone-800 text-gray-200 p-5 flex flex-wrap md:gap-5 gap-3 items-center max-w-xl md:h-[18rem]
       justify-center rounded-xl shadow-2xl relative md:mb-0 mb-[5rem]"
      data-aos="fade-up"
    >
      <BorderBeam />

      <div
        className={`font-bold md:text-3xl text-xl absolute top-0 left-0 right-0 md:mt-[-4rem] mt-[-3.3rem] ${
          darkMode ? "text-dark" : "text-light"
        }`}
      >
        {title}
      </div>
      {tools.map((tool, index) => (
        <div
          key={tool.name}
          className="font-bold rounded-xl border px-2 py-1 flex items-center justify-center"
        >
          <div className="p-1 flex items-center">
            <img
              src={tool.logoSrc}
              alt=""
              className="md:w-3 md:h-auto w-3 h-auto"
            />
          </div>
          <div className="p-1 md:text-sm text-[0.7rem]">{tool.name}</div>
        </div>
      ))}
    </div>
  );

  return (
    <>
      <div
        id="toolkit"
        className={`toolkit-header ${
          darkMode ? "text-dark" : "text-light"
        } flex bg-transparent justify-center text-center`}
      >
        <div
          data-aos="fade-right"
          data-aos-offset="0"
          data-aos-easing="ease-in-sine"
          className="font-bold items-center md:text-7xl text-4xl my-36 header-font"
        >
          Toolkit
        </div>
      </div>
      <div className="toolkit-content1 md:flex flex-wrap justify-center text-center md:gap-[6rem] gap-[6.5rem] ml-4 mr-4 body-text-medium">
        {renderToolSection(web_tools, "Web")}
        {renderToolSection(xr_tools, "XR")}
        {renderToolSection(devops_tools, "DevOps/DevSecOps")}
      </div>
    </>
  );
}

export default Toolkit;
