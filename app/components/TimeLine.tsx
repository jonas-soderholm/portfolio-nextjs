"use client";

import React from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { useDarkMode } from "./DarkModeContext";

function TimeLine() {
  const { darkMode } = useDarkMode();

  useEffect(() => {
    AOS.init({ duration: 350 });
    return () => AOS.refresh();
  }, [darkMode]);

  return (
    <>
      <div id="experience"></div>
      <ul
        data-aos="zoom-in"
        data-aos-easing="ease-out-cubic"
        data-aos-duration="500"
        className={`${
          darkMode ? "text-dark" : "text-light"
        } timeline timeline-vertical lg:flex lg:justify-center mr-28 md:mr-0 lg:timeline-horizontal mt-40 text-stone-200`}
      >
        <li>
          <div className="timeline-start ">2019</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box text-dark card-bg">
            Nackademin VR Dev
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start">2020</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box text-dark card-bg">
            Flowtropolis
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start">2023</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box text-dark card-bg">
            Python IT Security
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start">2024</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box text-dark card-bg">
            Chas Academy IT Security for users
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start">2024</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box text-dark card-bg">
            InfinityITC Intern
          </div>
          <hr />
        </li>
        <li>
          <hr />
          <div className="timeline-start">Now</div>
          <div className="timeline-middle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-5 w-5"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="timeline-end timeline-box text-dark card-bg">
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
