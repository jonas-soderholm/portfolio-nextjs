"use client";

import React from "react";

const links = [
  {
    href: "https://github.com/jonas-soderholm",
    label: "GitHub",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="black"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 .296c-6.627 0-12 5.373-12 12 0 5.304 3.438 9.8 8.205 11.388.6.111.793-.261.793-.577
          0-.285-.010-1.238-.016-2.243-3.338.725-4.043-1.607-4.043-1.607
          -.546-1.384-1.333-1.754-1.333-1.754-1.087-.743.083-.728.083-.728
          1.205.084 1.838 1.237 1.838 1.237 1.067 1.826 2.8 1.299 3.482.992
          .108-.773.42-1.299.762-1.599-2.665-.303-5.465-1.332-5.465-5.923
          0-1.308.467-2.378 1.238-3.22-.125-.303-.537-1.527.116-3.176
          0 0 1.007-.322 3.302 1.229.957-.266 1.987-.398 3.005-.402
          1.018.004 2.048.136 3.005.402 2.295-1.551 3.302-1.229 3.302-1.229
          .653 1.649.242 2.873.118 3.176.773.842 1.238 1.912 1.238 3.22
          0 4.607-2.805 5.617-5.466 5.92.43.37.813 1.097.813 2.21
          0 1.592-.014 2.868-.016 3.253 0 .32.191.693.797.577
          C20.565 22.097 24 17.601 24 12.296c0-6.627-5.373-12-12-12z"
        />
      </svg>
    ),
  },
  {
    href: "https://www.linkedin.com/in/jonas-soderholm/",
    label: "LinkedIn",
    icon: (
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="#0077B5"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM0 23.5h5V7.5H0v16zM8 7.5h4.7v2.1h.1c.7-1.3 2.4-2.7 5-2.7 5.3 0 6.3 3.5 6.3 8v9.6h-5V16c0-1.8-.1-4.2-2.6-4.2-2.6 0-3 2-3 4v7.7H8V7.5z" />
      </svg>
    ),
  },
  {
    href: "https://drive.google.com/file/d/11IvNvj2B3LCG7ArUBy9zGdHqyUMt5E8I/view?usp=sharing",
    label: "Resume",
    icon: (
      <span className="text-4xl" role="img" aria-label="Certificate">
        📄
      </span>
    ),
  },
  {
    href: "https://drive.google.com/drive/folders/1o1aGlvrZ2CrpFbpeawMLM4JpNfpWcyHN?usp=sharing",
    label: "Certifications",
    icon: (
      <span className="text-4xl" role="img" aria-label="Trophy">
        🏆
      </span>
    ),
  },
];

export default function Experience() {
  return (
    <div className="flex items-center justify-center w-full mt-44 gap-12">
      {links.map(({ href, label, icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center"
        >
          <div className="border size-20 rounded-full bg-slate-400/20 backdrop-blur border-slate-200  transition-colors flex items-center justify-center hover:bg-slate-200/60 ">
            {icon}
          </div>
          <span className="text-md text-slate-200 mt-2 font-bold">{label}</span>
        </a>
      ))}
    </div>
  );
}
