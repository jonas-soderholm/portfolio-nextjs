"use client";

import React from "react";
import { useDarkMode } from "./DarkModeContext";

function TimeLine() {
  const { darkMode } = useDarkMode();

  return (
    <>
      <div id="experience"></div>
      <ul
        className={`${
          darkMode ? "text-blackish" : "text-blackish"
        } timeline timeline-vertical lg:flex lg:justify-center mr-28 md:mr-0 lg:timeline-horizontal mt-40 text-stone-200`}
      >
        <li>
          <div className="timeline-start text-slate-200">2019</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-slate-200 h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box border backdrop-blur bg-slate-400/20 bg-slate-200 border-slate-200 text-slate-200">
            Nackademin VR Dev
          </div>
          <hr className="bg-slate-400" />
        </li>
        <li>
          <hr className="bg-slate-400" />
          <div className="timeline-start text-slate-200">2020</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-slate-200 h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box border backdrop-blur bg-slate-400/20 bg-slate-200 border-slate-200 text-slate-200">
            Flowtropolis
          </div>
          <hr className="bg-slate-400" />
        </li>
        <li>
          <hr className="bg-slate-400" />
          <div className="timeline-start text-slate-200">2023</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-slate-200 h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box border backdrop-blur bg-slate-400/20 bg-slate-200 border-slate-200 text-slate-200">
            Python IT Security
          </div>
          <hr className="bg-slate-400" />
        </li>
        <li>
          <hr className="bg-slate-400" />
          <div className="timeline-start text-slate-200">2024</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-slate-200 h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box border backdrop-blur bg-slate-400/20 bg-slate-200 border-slate-200 text-slate-200">
            Chas Academy IT Security for users
          </div>
          <hr className="bg-slate-400" />
        </li>
        <li>
          <hr className="bg-slate-400" />
          <div className="timeline-start text-slate-200">2024</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-slate-200 h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box border backdrop-blur bg-slate-400/20 bg-slate-200 border-slate-200 text-slate-200">
            InfinityITC Intern
          </div>
          <hr className="bg-slate-400" />
        </li>
        <li>
          <hr className="bg-slate-400" />
          <div className="timeline-start text-slate-200">Now</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="text-slate-200 h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box border backdrop-blur bg-slate-400/20 bg-slate-200 border-slate-200 text-slate-200">
            Running{" "}
            <a
              href="https://juporia.com"
              target="_blank"
              className="underline text-blue-400"
            >
              Juporia.com
            </a>{" "}
            & Consulting
          </div>
        </li>
      </ul>
    </>
  );
}

export default TimeLine;
