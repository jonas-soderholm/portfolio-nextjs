"use client";

import { useDarkMode } from "./DarkModeContext";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function Contact() {
  const { darkMode } = useDarkMode();

  useEffect(() => {
    AOS.init({ duration: 350 });
  }, []);

  return (
    <div
      data-aos="fade-right"
      data-aos-offset="150"
      data-aos-easing="ease-in-sine"
      id="contact"
      className={`${
        darkMode ? "text-dark" : "text-light"
      } contact-container py-36 `}
    >
      <h1 className="contact-header flex flex-col items-center font-bold mb-2 md:text-7xl text-4xl header-font">
        Contact
      </h1>
      <div className="contact-info body-text-medium">
        <div className="pt-2 text-center">
          <a className="">jonas.soderholm89@gmail.com</a>
          <p className="">0700 984 652</p>
          <p className="mt-3 mb-6">Stockholm, Sweden</p>
          <div className="icon text-4xl">❤️</div>
        </div>
      </div>
    </div>
  );
}

export default Contact;

// asdKKC
